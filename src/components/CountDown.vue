<script setup>
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps(["renderData"]);
const current = ref(null);
const countID = ref(null);

const counting = () => {
  countID.value = setInterval(() => {
    current.value = current.value - 1;
  }, 1 * 1000);
};

watch(
  () => props.renderData,
  () => {
    current.value = 30;
    if (countID.value !== null) {
      window.clearInterval(countID.value);
      counting();
    } else {
      counting();
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  window.clearInterval(countID.value);
});
</script>
<template>
  <div class="count">
    <p>更新時間</p>
    <p>
      <strong>{{ current }}</strong> 秒
    </p>
  </div>
</template>
