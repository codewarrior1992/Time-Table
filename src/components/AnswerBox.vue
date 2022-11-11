<script setup>
import { ref } from "vue";
const props = defineProps(["item"]);

// eslint-disable-next-line vue/no-setup-props-destructure
const { title, paragraphOne, paragraphTwo } = props.item;

const toggle = ref(false);
</script>
<template>
  <div class="answer">
    <div class="main" @click="toggle = !toggle">
      <span class="material-symbols-outlined"> help </span>
      <span>{{ title }}</span>
      <span class="material-symbols-outlined"> navigate_next </span>
    </div>
    <Transition name="slide">
      <div class="sub" v-if="toggle">
        <div class="content">
          <p v-if="paragraphOne">{{ paragraphOne }}</p>
          <p v-if="paragraphTwo">{{ paragraphTwo }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
