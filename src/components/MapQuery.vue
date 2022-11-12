<script setup>
import { ref, reactive, watch, onBeforeUnmount, onMounted } from "vue";
import { city } from "../assets/js/city.js";
import {
  getRoutes,
  getEstimatedTime,
  getStopOfRoute,
} from "../assets/js/tdx.js";

import LeftletMap from "../components/LeftletMap.vue";
import CountDown from "../components/CountDown.vue";

const isLoading = ref(false);
const isCity = ref(false);
const isRoute = ref(false);
const countID = ref(null);

const departureName = ref("");
const destinationName = ref("");
const routeName = ref("");

const currentCity = ref("");
const currentCityText = ref("");
const currentRoute = ref("");
const currentRouteText = ref("");
const routesOfCity = ref([]);
const currentSubRouteNameAry = ref([]);
const currentSubRouteID = ref(null);
const currentDirection = ref(0);
let getTime = reactive([]);
let getStation = reactive({});
const renderData = ref([]);
const targetStation = ref({});

// 01. User Behavior
const loading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

const chooseCity = async (city) => {
  const { key, value } = city;
  isCity.value = false;
  const rawData = await getRoutes(key);
  currentCity.value = key;
  currentCityText.value = value;
  routesOfCity.value = rawData.map((item) => {
    return {
      route: item.RouteName.Zh_tw,
      departure: item.DepartureStopNameZh,
      destination: item.DestinationStopNameZh,
    };
  });
};
const chooseRoute = (item) => {
  const { route, departure, destination } = item;
  currentRoute.value = route;
  currentRouteText.value = `[${item.route}]  ${item.departure} - ${item.destination}`;
  departureName.value = departure;
  destinationName.value = destination;
  routeName.value = route;
  isRoute.value = false;
};
const chooseSubRoute = (id) => {
  currentSubRouteID.value = id;
  renderData.value = combine();
  loading();
};
const chooseDirection = (path) => {
  currentDirection.value = path;
  renderData.value = combine();
  loading();
};
const setPosition = (item) => {
  targetStation.value = item;
};

// 02. Fetch Data
const fetchEstimated = async () => {
  // 1. Fetch Data
  const aryEstimated = await getEstimatedTime(
    currentCity.value,
    currentRoute.value
  );

  // 2. Filter Key Word
  return aryEstimated.filter((el) => el.RouteName.Zh_tw === currentRoute.value);
};
const fetchStopOfRoute = async () => {
  // 1. Fetch Data
  const stopOfRoute = await getStopOfRoute(
    currentCity.value,
    currentRoute.value
  );

  // 2. Filter Key Word
  const targetStopOfRoute = stopOfRoute.filter(
    (el) => el.RouteName.Zh_tw === currentRoute.value
  );

  // 3. Get Specific SubRoute And Return
  const uniSubRouteIdAry = Array.from(
    new Set(targetStopOfRoute.map((item) => item.SubRouteID))
  );

  const subRouteData = {};
  uniSubRouteIdAry.forEach((id) => {
    subRouteData[id] = { 0: {}, 1: {} };
    targetStopOfRoute.forEach((item) => {
      if (id === item.SubRouteID && item.Direction === 0) {
        subRouteData[id][0].SubRouteName = item.SubRouteName.Zh_tw;
        subRouteData[id][0].SubRouteID = item.SubRouteID;
        subRouteData[id][0].Stops = item.Stops;
      }
      if (id === item.SubRouteID && item.Direction === 1) {
        (subRouteData[id][1].SubRouteName = item.SubRouteName.Zh_tw),
          (subRouteData[id][1].SubRouteID = item.SubRouteID);
        subRouteData[id][1].Stops = item.Stops;
      }
    });
  });

  return subRouteData;
};

// 03. Combine Data
const combine = () => {
  // 1. Classify EstimatedTime & StopOfRoute by Direction
  let stations;
  let timetable;

  const isEmpty = Object.values(
    getStation[currentSubRouteID.value][currentDirection.value]
  );

  if (isEmpty.length != 0) {
    stations =
      getStation[currentSubRouteID.value][currentDirection.value].Stops;
    timetable = getTime.filter((el) => el.Direction === currentDirection.value);
  } else {
    stations = [];
  }

  // 2. Combine Data of EstimatedTime & StopOfRoute
  const combineData = [];

  stations.forEach((station) => {
    timetable.forEach((time) => {
      if (station.StopID === time.StopID) {
        combineData.push({
          EstimateTime: time.EstimateTime,
          StopStatus: time.StopStatus,
          StopID: station.StopID,
          StopName: station.StopName.Zh_tw,
          StopPosition: station.StopPosition,
          StopSequence: station.StopSequence,
        });
      }
    });
  });

  return combineData;
};

// 04. Data Processing
const dataProcessing = async () => {
  // 撈資料
  getTime = await fetchEstimated();
  getStation = await fetchStopOfRoute();
  // 選取預設路線
  chooseSubRoute(Object.keys(getStation)[0]);
  // 副線中文名
  currentSubRouteNameAry.value = Object.entries(getStation);
  loading();
};

const setIntervalAndGetData = () => {
  countID.value = setInterval(() => {
    dataProcessing();
  }, 1000 * 30);
};

watch(currentRoute, async () => {
  dataProcessing();
  if (countID.value !== null) {
    window.clearInterval(countID.value);
    setIntervalAndGetData();
  } else {
    setIntervalAndGetData();
  }
});

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (e.target.nodeName != "INPUT") {
      isCity.value = false;
      isRoute.value = false;
    }
  });
});

onBeforeUnmount(() => {
  window.clearInterval(countID.value);
});
</script>

<template>
  <LoadingEffect v-model:active="isLoading"> </LoadingEffect>
  <section class="map-query">
    <div class="select-section">
      <div class="select">
        <div class="wrap">
          <strong>選擇地區</strong>
          <label
            ><input
              type="text"
              placeholder="例如 : 臺北市"
              v-model="currentCityText"
              :class="{ active: city }"
              @click="isCity = !isCity"
          /></label>
          <Transition name="fade">
            <ul class="dropdown-list" v-if="isCity" ref="root">
              <li v-for="item in city" :key="item" @click="chooseCity(item)">
                {{ item.value }}
              </li>
            </ul>
          </Transition>
        </div>
        <div class="wrap">
          <strong>選擇公車路線</strong>
          <label>
            <input
              type="text"
              placeholder="例如 : 0東、綠1、234"
              v-model="currentRouteText"
              :class="{ active: currentRouteText }"
              @click="isRoute = !isRoute"
            />
          </label>
          <Transition name="fade">
            <ul class="dropdown-list" v-if="isRoute">
              <li
                v-for="(item, i) in routesOfCity"
                :key="i"
                @click="chooseRoute(item)"
              >
                {{ `[${item.route}]  ${item.departure} - ${item.destination}` }}
              </li>
            </ul>
          </Transition>
        </div>
      </div>
    </div>

    <div class="route-text" v-if="renderData.length > 0">
      <div class="route">
        <span>ROUTE NAME</span>
        <strong>{{ routeName }}</strong>
      </div>
      <div class="station">
        <span> Departure & Destination Stop Name </span>
        <div class="road">
          <strong>{{ departureName }}</strong>
          <span class="material-symbols-outlined"> height </span>
          <strong>{{ destinationName }}</strong>
        </div>
      </div>
    </div>

    <div class="route-info" v-if="currentSubRouteNameAry.length > 0">
      <p>
        附屬路線，共有<strong>{{ currentSubRouteNameAry.length }}</strong
        >條
      </p>
      <div class="btn-group">
        <button
          type="button"
          class="sub-route"
          v-for="(item, i) in currentSubRouteNameAry"
          :key="i"
          :class="{ active: currentSubRouteID == item[0] }"
          @click="chooseSubRoute(item[0])"
        >
          {{ item[1][0].SubRouteName }}
        </button>
      </div>
    </div>

    <div class="map-info">
      <div class="route-tabs" v-if="renderData.length > 0">
        <a
          href="#"
          class="forward"
          :class="{ active: currentDirection == 0 }"
          @click.prevent="chooseDirection(0)"
        >
          <span>去程</span>
          <strong>{{ departureName }}</strong>
        </a>
        <a
          href="#"
          class="backward"
          :class="{ active: currentDirection == 1 }"
          @click.prevent="chooseDirection(1)"
        >
          <span>回程</span>
          <strong>{{ destinationName }}</strong>
        </a>
      </div>
      <div class="info-group">
        <div class="station-area">
          <div class="info" v-if="renderData.length > 0">
            <ul class="status">
              <li>站序</li>
              <li>尚未發車</li>
              <li>站名</li>
            </ul>
            <ul class="info-list">
              <li
                v-for="(item, i) in renderData"
                :key="i"
                :class="{ active: Math.floor(item.EstimateTime / 60) <= 1 }"
                @click="setPosition(item)"
              >
                <span>
                  <strong class="num">{{ i + 1 }}</strong>
                </span>
                <span class="status">
                  <strong
                    v-if="Math.floor(item.EstimateTime / 60) <= 1"
                    class="pulling-in"
                    >進站中</strong
                  >
                  <strong
                    v-if="
                      item.StopStatus == 0 &&
                      Math.floor(item.EstimateTime / 60) > 1
                    "
                    class="current-min"
                    >{{ Math.floor(item.EstimateTime / 60) }} 分鐘</strong
                  >
                  <strong v-if="item.StopStatus == 1" class="await"
                    >尚未發車</strong
                  >
                  <strong v-if="item.StopStatus == 2" class=""
                    >交管不停靠</strong
                  >
                  <strong v-if="item.StopStatus == 3" class="passed"
                    >末班車已過</strong
                  >
                  <strong v-if="item.StopStatus == 4" class="unavailable"
                    >今日未營運</strong
                  >
                </span>
                <span class="name">{{ item.StopName }}</span>
              </li>
            </ul>
          </div>
          <div class="choose-text" v-else>
            <div class="choose">
              <img src="../assets/image/service/station.png" alt="" />
              <p>
                請先選擇地區
                <br />
                再選擇/搜尋公車路線
              </p>
            </div>
          </div>
        </div>
        <div class="map-area">
          <LeftletMap :data="renderData" :target="targetStation" />
        </div>
      </div>
    </div>

    <CountDown v-if="renderData.length > 0" :renderData="renderData" />
  </section>
</template>
