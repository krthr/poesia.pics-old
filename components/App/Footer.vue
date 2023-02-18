<template>
  <footer
    class="footer footer-center p-8 pb-6 bg-primary text-primary-content bottom-0"
  >
    <div>
      <a
        href="https://www.buymeacoffee.com/wilsontovar"
        target="_blank"
        aria-label="Donar"
      >
        <img
          alt="Donar"
          src="https://img.buymeacoffee.com/button-api/?text=Tu aporte significa mucho&emoji=💖&slug=wilsontovar&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
        />
      </a>
    </div>
    <div>
      <p class="font-bold inline-flex items-center">
        Hecho con
        <Icon class="w-4 h-4 text-red-700 mx-1" icon="ph:heart-fill" />
        por Wilson Tovar
      </p>
      <p>Copyright © 2023 - All right reserved</p>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <a
          v-for="{ icon, href, label } in socialLinks"
          :key="href"
          :href="href"
          :aria-label="label"
          target="_blank"
        >
          <Icon class="w-6 h-6" :icon="icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const socialLinks = [
  {
    label: "Instagram de Wilson",
    icon: "ph:instagram-logo-fill",
    href: "https://instagram.com/wilson__tovar",
  },
  {
    label: "GitHub de Wilson",
    icon: "ph:github-logo-fill",
    href: "https://github.com/krthr",
  },
  {
    label: "Twitter de Wilson",
    icon: "ph:twitter-logo-fill",
    href: "https://twitter.com/_krthr",
  },
  {
    label: "LinkedIn de Wilson",
    icon: "ph:linkedin-logo-fill",
    href: "https://linkedin.com/in/wilsontovar",
  },
];
</script>
