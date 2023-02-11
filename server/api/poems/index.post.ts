import { StorePoemSchema } from "@/server/validators/StorePoem";
import { poemsCollection } from "@/server/services/Firebase";
import { validateSignature } from "@/server/utils/hash";
// import { logger } from "~~/server/logger";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parse = await StorePoemSchema.safeParseAsync(body);
  if (!parse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "",
    });
  }

  const { signature, ...data } = parse.data;

  const alreadyExists = await poemsCollection
    .where("signature", "==", signature)
    .limit(1)
    .count()
    .get();

  if (alreadyExists.data().count > 0) {
    throw createError({
      statusCode: 403,
      statusMessage: "Ya existe una fotografía con el mismo poema.",
    });
  }

  const isValid = validateSignature(signature, { ...data });
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Firma inválida.",
    });
  }

  const doc = poemsCollection.doc();
  await doc.create(parse.data);

  return { id: doc.id, ...parse.data };
});
