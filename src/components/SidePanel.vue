<script setup>
import { ref, inject } from "vue";

const isOpen = ref(false);
const emitter = inject("emitter");

emitter.on("openMenu", (value) => {
  isOpen.value = value;
});
</script>
<template>
  <section class="side-panel" :class="{ active: isOpen }">
    <span class="material-symbols-outlined" @click="isOpen = !isOpen">
      close
    </span>
    <ul>
      <li><RouterLink to="/">首頁</RouterLink></li>
      <li><RouterLink to="/dynamics">公車動態</RouterLink></li>
      <li><RouterLink to="/question">常見問題</RouterLink></li>
    </ul>
  </section>
</template>
<style lang="scss" scoped></style>
