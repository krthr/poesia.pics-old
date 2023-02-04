<template>
  <footer
    class="footer footer-center p-8 pb-6 bg-primary text-primary-content bottom-0"
  >
    <div>
      <p class="font-bold inline-flex items-center">
        Hecho con
        <SvgIcon
          class="w-4 h-4 text-red-700 mx-1"
          :path="mdiHeart"
          type="mdi"
        />
        por Wilson Tovar
      </p>
      <p>Copyright © 2023 - All right reserved</p>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.href"
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
        >
          <SvgIcon :path="link.icon" type="mdi" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiInstagram,
  mdiTwitter,
  mdiGithub,
  mdiLinkedin,
  mdiHeart,
} from "@mdi/js";

const socialLinks = [
  {
    label: "Instagram de Wilson",
    icon: mdiInstagram,
    href: "https://instagram.com/wilson__tovar",
  },
  {
    label: "GitHub de Wilson",
    icon: mdiGithub,
    href: "https://github.com/krthr",
  },
  {
    label: "Twitter de Wilson",
    icon: mdiTwitter,
    href: "https://twitter.com/_krthr",
  },
  {
    label: "LinkedIn de Wilson",
    icon: mdiLinkedin,
    href: "https://linkedin.com/in/wilsontovar",
  },
];
</script>
