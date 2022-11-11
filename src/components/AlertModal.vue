<script setup>
const emit = defineEmits(["close"]);
const emitClose = () => {
  emit("close");
};
</script>
<template>
  <div class="modal" @click.self="emitClose">
    <div class="content">
      <div class="header">
        <strong>備註說明</strong>
        <span class="material-symbols-outlined" @click="emitClose">
          close
        </span>
      </div>
      <div class="body">
        <p>
          部分縣市中，會有些許路線中會有多條
          <strong>附屬路線資料</strong>
          ，例如：臺北市 [0東 臺北車站-內湖]、[綠1 臺北車站-新店] 路線等。
        </p>
      </div>
      <div class="footer">
        <button type="button" @click="emitClose">取消</button>
        <button type="button" @click="emitClose">確定</button>
      </div>
    </div>
  </div>
</template>
