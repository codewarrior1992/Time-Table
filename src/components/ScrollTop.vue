<script setup>
import { onMounted, ref } from "vue";
const isScroll = ref(false);
onMounted(() => {
  window.addEventListener("scroll", () => {
    const condition =
      document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
    condition ? (isScroll.value = true) : (isScroll.value = false);
  });
});

const scrollFun = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
</script>
<template>
  <Transition name="fade">
    <a class="scroll" v-if="isScroll" @click.prevent="scrollFun">
      <img src="../assets/image/scroll.svg" alt="" />
    </a>
  </Transition>
</template>
