import { GeneratePoemSchema } from "@/server/validators/GeneratePoem";
import { annotateImage } from "@/server/services/Vision";
import { createCompletion } from "@/server/services/OpenAi";
import { logger } from "@/server/logger";
import { getRandomAuthors } from "@/server/services/Authors";
import { processImage } from "@/server/utils/image";

const MODES: Record<string, string> = {
  erotic: "An erotic",
  romantic: "A romantic",
};

export default defineEventHandler(async (event) => {
  let body;
  let query;

  try {
    body = await readBody(event);
    query = getQuery(event);
  } catch (error) {
    logger.error(error);
    throw createError({
      statusCode: 400,
      statusMessage: "Error al leer la petición.",
    });
  }

  const mode = typeof query.mode === "string" ? query.mode : undefined;

  logger.info({ mode }, "generatePoem");

  const parse = await GeneratePoemSchema.safeParseAsync(body);
  if (!parse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "No se recibió imagen. Inténtalo nuevamente.",
    });
  }

  const processedImage = await processImage(parse.data.image);
  if (!processedImage) {
    throw createError({
      statusCode: 400,
      statusMessage: "Error al leer la imagen.",
    });
  }

  const annotations = await annotateImage(processedImage.buffer);
  if (!annotations) {
    throw createError({
      statusCode: 422,
      statusMessage: "Error al procesar la imagen. Intenta usar otra.",
    });
  }

  const { labels, objects, colors } = annotations;
  const keywords = Array.from(new Set([...labels, ...objects])).map((keyword) =>
    keyword.trim().toLowerCase()
  );

  const author = getRandomAuthors();
  const poemPrompt: string[] = [];

  if (mode && mode in MODES) {
    poemPrompt.push(MODES[mode]);
  } else {
    poemPrompt.push("A");
  }

  poemPrompt.push(
    `poem in Spanish written by ${author.join(", ")} inspired by:`
  );
  poemPrompt.push(keywords.join(", "));
  poemPrompt.push("\n");

  const poem = await createCompletion(poemPrompt.join(" "), {
    temperature: 0.8,
    max_tokens: 300 + poemPrompt.length,
  });

  if (!poem) {
    throw createError({
      statusCode: 422,
      statusMessage:
        "No se ha generado ningún poema. Intenta usando otra imagne.",
    });
  }

  const generatedAt = new Date();
  const generatedAtLabel = Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(generatedAt);

  const data = {
    author,
    colors,
    image: processedImage.base64,
    generatedAt,
    generatedAtLabel,
    keywords,
    mode,
    poem,
  };

  const signature = generateSignature(data);
  if (!signature) {
    throw createError({
      statusCode: 500,
      statusMessage: "Ha ocurrido un error al generar el poema.",
    });
  }

  return {
    ...data,
    signature,
  };
});
