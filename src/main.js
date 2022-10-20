import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

import "@/assets/scss/main.scss";
import "./assets/js/axios.js";

// mitt
import mitt from "mitt";
const emitter = mitt();
app.provide("emitter", emitter);

// light box
import VueEasyLightbox from "vue-easy-lightbox";
app.use(VueEasyLightbox);

app.use(createPinia());
app.use(router);

app.mount("#app");
