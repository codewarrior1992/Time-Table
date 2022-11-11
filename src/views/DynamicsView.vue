<script setup>
import { ref, onMounted } from "vue";
import Banner from "../components/BannerCover.vue";
import Heading from "../components/HeadingFile.vue";
import Modal from "../components/AlertModal.vue";
import MapQuery from "../components/MapQuery.vue";

const isOpen = ref(false);
const isLoading = ref(false);

const closeModal = (val) => {
  isOpen.value = val;
};
const banner = {
  cover:
    "https://raw.githubusercontent.com/codewarrior1992/Time-Table/master/src/assets/image/banner/dynamics.jpg",
  link: "dynamics",
  zh: "公車動態",
  en: "BUS DYNAMICS",
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 700);
});
</script>

<template>
  <div>
    <LoadingEffect v-model:active="isLoading"> </LoadingEffect>
    <Banner :banner="banner" />
    <teleport to="body">
      <Transition name="fade">
        <Modal v-if="isOpen" @close="closeModal" />
      </Transition>
    </teleport>
    <section class="dynamics container">
      <Heading
        main="BUS ROUTENAME"
        sub="查詢公車即時動態"
        slogan=" 選擇相對應縣市後，再選擇要查詢公車路線，即可顯示相關停靠站序、公車到站時刻等。"
      >
        <template #notice>
          <span
            class="material-symbols-outlined error"
            title="備註說明"
            @click="isOpen = true"
          >
            error
          </span>
        </template>
      </Heading>
      <MapQuery />
    </section>
  </div>
</template>
