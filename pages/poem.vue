<template>
  <div>
    {{ poem }}
  </div>
</template>

<script setup lang="ts">
import { PoemSchema } from "@/server/validators/Poem";

const route = useRoute();
const query = route.query;

const parse = await PoemSchema.safeParseAsync(query);
// if (!parse.success) {
//   throw createError({ statusCode: 404 });
// }

// const poem = parse.data;
const poem = query;
</script>
