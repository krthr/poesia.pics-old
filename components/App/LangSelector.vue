<template>
    <div>
        <select v-model="locale" class="absolute bottom-2 right-2">
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    </div>
  </template>
  
  <script lang="ts" setup>
  // @ts-ignore
  const { locale } = useI18n()
  
  </script>
  