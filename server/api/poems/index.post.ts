export default defineEventHandler(async () => {
  throw createError({
    statusCode: 501,
    statusMessage: "No implementado.",
  });
});
