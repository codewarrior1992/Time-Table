<script setup>
import Header from "./components/HeaderFile.vue";
import SidePanel from "./components/SidePanel.vue";

import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <SidePanel />
  <RouterView />
</template>
