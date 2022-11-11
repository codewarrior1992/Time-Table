<script setup>
import Header from "./components/HeaderFile.vue";
import SidePanel from "./components/SidePanel.vue";
import Footer from "./components/FooterFile.vue";
import Scroll from "./components/ScrollTop.vue";

import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <SidePanel />
  <RouterView />
  <Footer />
  <Scroll />
</template>
