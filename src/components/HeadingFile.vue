<script setup>
import { toRefs } from "vue";
const props = defineProps(["main", "sub", "slogan"]);
const { main, sub, slogan } = toRefs(props);
</script>
<template>
  <div class="heading zoom-in" data-aos="zoom-in">
    <span class="main">{{ main }}</span>
    <div class="sub">
      <strong>{{ sub }}</strong>
      <slot name="notice"></slot>
    </div>
    <p>{{ slogan }}</p>
  </div>
</template>
