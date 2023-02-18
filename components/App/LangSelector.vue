<template>
  <div>
    <select v-model="locale" class="select select-bordered bottom-2 right-2">
      <option v-for="locale in LOCALES" :value="locale">
        {{ LOCALES_NAMES[locale] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { LOCALES, LOCALES_NAMES } from "@/constants/locales";

const { locale } = useI18n();
</script>
