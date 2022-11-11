<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  banner: {
    type: Object,
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const { cover, link, zh, en } = props.banner;
</script>
<template>
  <section
    class="banner-cover"
    :style="{ 'background-image': 'url(' + cover + ')' }"
  >
    <div class="text-group">
      <h1>
        首頁 / <RouterLink :to="`/${link}`">{{ zh }}</RouterLink>
      </h1>
      <h2>{{ en }}</h2>
    </div>
  </section>
</template>
