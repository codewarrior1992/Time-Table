<script setup>
import { toRefs } from "vue";
const props = defineProps(["main", "sub", "slogan"]);
const { main, sub, slogan } = toRefs(props);
</script>
<template>
  <div class="heading">
    <span>{{ main }}</span>
    <strong>{{ sub }}</strong>
    <p>{{ slogan }}</p>
  </div>
</template>
