<script setup>
import { ref, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AntPath } from "leaflet-ant-path";

const props = defineProps(["data", "target"]);
const mapContent = ref(null);
const posText = 0;
const posArr = 1;

let map = null;
let currentPath = [];
let currentCircle = [];
let currentCenter = [];
let currentPosition = [];

// 資料處理
const dataProcessing = (val) => {
  currentPosition = val.map((d) => [
    d.StopName,
    [d.StopPosition.PositionLat, d.StopPosition.PositionLon],
  ]);
  currentPath = currentPosition.map((item) => item[posArr]);
  currentCenter = Math.floor(currentPosition.length / 2);
};

// 設定圖層
const setLayer = () => {
  currentPath = new L.Polyline.AntPath(currentPath, {
    delay: 800,
    dashArray: [10, 25],
    weight: 8,
    color: "#ff4c29",
    pulseColor: "#FFFFFF",
    hardwareAccelerated: true,
  }).addTo(map);

  currentCircle = currentPosition.map((pos) => {
    return L.circle(pos[posArr], {
      color: "#ffffff",
      fillColor: "#ff4c29",
      fillOpacity: 1,
      radius: 25,
    })
      .bindPopup(`${pos[posText]}`)
      .addTo(map);
  });
};

// 刪除圖層
const deleteLayer = () => {
  map.removeLayer(currentPath);
  currentCircle.forEach((item) => {
    map.removeLayer(item);
  });
};

// 選擇路線
watch(
  () => props.data,
  (val) => {
    deleteLayer();
    dataProcessing(val);
    setLayer();
    map.flyTo(currentPosition[currentCenter][posArr], 14, {
      animate: true,
      duration: 0.5,
    });
  }
);

// 選擇站點
watch(
  () => props.target,
  (val) => {
    const { PositionLon, PositionLat } = val.StopPosition;
    const { StopName } = val;

    map.flyTo([PositionLat, PositionLon], 16, {
      animate: true,
      duration: 0.5,
    });

    L.popup()
      .setLatLng([PositionLat, PositionLon])
      .setContent(StopName)
      .openOn(map);
  }
);

// 地圖初始化
onMounted(() => {
  map = L.map(mapContent.value);
  map.setView([23.852463, 121.258485], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
});
</script>
<template>
  <div class="mapContent" ref="mapContent"></div>
</template>
