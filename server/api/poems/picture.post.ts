import { PoemSchema } from "@/server/validators/Poem";

import { logger } from "@/server/logger";
import { Puppeteer } from "@/server/services/Puppeteer";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);

  const parse = await PoemSchema.safeParseAsync(body);
  if (!parse.success) {
    logger.error(parse.error);
    throw createError({
      statusCode: 400,
      statusMessage: "Poema inválido.",
    });
  }

  const { signature, ...data } = parse.data;
  const isValid = validateSignature(signature, { ...data });
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Firma inválida.",
    });
  }

  const browser = await Puppeteer();
  const page = await browser.newPage();

  logger.info({ envVercelUrl: runtimeConfig.envVercelUrl }, "picture poem");

  const url = new URL(runtimeConfig.envVercelUrl + "/poem");

  url.searchParams.append("poem", data.poem);
  for (const a of data.author) {
    url.searchParams.append("author[]", a);
  }

  await page.goto(url.toString());

  const screenshot = await page.screenshot({
    fullPage: true,
    quality: 100,
    type: "jpeg",
  });

  return screenshot;
});
