<!-- eslint-disable no-undef -->
<script setup>
import { ref } from "vue";
import Heading from "../components/HeadingFile.vue";
import Feature from "../components/FeaturesFile.vue";
import VueEasyLightbox from "vue-easy-lightbox";
const cover = new URL(`../assets/image/home.jpg`, import.meta.url).href;

const visibleRef = ref(false);
const indexRef = ref(0);
const imgsRef = ref([]);

const photos = [1, 2, 3, 4].map(
  (photo) =>
    new URL(`../assets/image/gallery/${photo}.jpg`, import.meta.url).href
);
console.log(photos);
</script>

<template>
  <div class="home">
    <section
      class="cover"
      :style="{ 'background-image': 'url(' + cover + ')' }"
    >
      <div class="text">
        <h1>TAIWAN BUS TIMETABLE</h1>
        <h2>全台公車動態時刻查詢應用服務</h2>
        <button type="button">立即體驗</button>
      </div>
    </section>
    <section class="bus">
      <img src="../assets/image/bus.png" alt="" />
    </section>
    <section class="intro">
      <Heading
        main="WELCOME"
        sub="我們的服務"
        slogan="提供全台最完善、最即時的公車動態服務，把握重要訊息不漏接!"
      >
      </Heading>
      <ul class="info-list">
        <li>
          <Feature
            img="time"
            main="公車到站時刻"
            sub="提供最即時的公車預期到站時刻，輕鬆掌握公車資訊。"
          ></Feature>
        </li>
        <li>
          <Feature
            img="station"
            main="公車站序列表"
            sub="提供完整站序列表，清楚了解目前公車位置。"
          ></Feature>
        </li>
        <li>
          <Feature
            img="map"
            main="公車地圖模式"
            sub="提供最清晰的公車路線地圖瀏覽模式，讓您清楚又明瞭。"
          ></Feature>
        </li>
      </ul>
    </section>
    <section class="gallery">
      <Heading
        main="GALLERY"
        sub="搭乘的美好時刻"
        slogan="我們的服務您放心，用心記錄與您互動的美好瞬間"
      >
      </Heading>
      <!--  -->
      <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="imgsRef"
        :index="indexRef"
        @hide="onHide"
      ></vue-easy-lightbox>
      <!--  -->
      <ul class="photo-list">
        <li v-for="(photo, i) in photos" :key="i" @click="showSingle(i)">
          <img :src="photo" alt="" />
        </li>
      </ul>
    </section>
  </div>
</template>
