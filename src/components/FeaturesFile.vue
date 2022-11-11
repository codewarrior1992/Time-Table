<script setup>
import { toRefs } from "vue";
const props = defineProps(["img", "main", "sub"]);
const { img, main, sub } = toRefs(props);
const photo = new URL(
  `../assets/image/service/${img.value}.png`,
  import.meta.url
).href;
</script>
<template>
  <div class="feature">
    <img :src="photo" alt="" />
    <strong>{{ main }}</strong>
    <span>{{ sub }}</span>
  </div>
</template>
