import { logger } from "@/server/logger";
import { poemsCollection } from "@/server/services/Firebase";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema no encontrado.",
    });
  }

  const doc = await poemsCollection
    .doc(id)
    .get()
    .catch((error) => {
      logger.error(error);
    });

  if (!doc?.exists) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema no encontrado.",
    });
  }

  return { id: doc.id, ...doc.data() };
});
