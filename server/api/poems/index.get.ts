import { logger } from "@/server/logger";
import { poemsCollection } from "@/server/services/Firebase";

const LIMIT = 10;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let page;

  if (typeof query.page !== "string") {
    page = 1;
  } else {
    const tmp = parseInt(query.page);
    if (isNaN(tmp)) {
      page = 1;
    } else {
      page = Math.max(tmp, 1);
    }
  }

  try {
    const documents = await poemsCollection
      .limit(LIMIT)
      .offset(LIMIT * (page - 1))
      .get();

    const data = documents.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data, page };
  } catch (error) {
    logger.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ha ocurrido un error.",
    });
  }
});
