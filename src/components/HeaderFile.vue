<script setup>
import { onMounted, inject } from "vue";
import { RouterLink } from "vue-router";
const emitter = inject("emitter");

const toggleMenu = (val) => {
  emitter.emit("openMenu", val);
};

onMounted(() => {
  const header = document.getElementsByTagName("header")[0];
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      header.style.padding = "8px 0";
      header.classList.add("active");
    } else {
      header.style.padding = "24px 0";
      header.classList.remove("active");
    }
  });
});
</script>
<template>
  <header>
    <nav class="container">
      <span class="material-symbols-outlined toggle" @click="toggleMenu(true)">
        menu
      </span>
      <RouterLink to="/" class="logo">
        <img src="../assets/image/logo.svg" alt="" />
      </RouterLink>
      <ul class="main-panel">
        <li><RouterLink to="/">首頁</RouterLink></li>
        <li>
          <RouterLink to="/dynamics">公車動態</RouterLink>
        </li>
        <li>
          <RouterLink to="/question">常見問題</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
