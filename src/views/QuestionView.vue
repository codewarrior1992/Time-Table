<script setup>
import { ref, onMounted } from "vue";
import Banner from "../components/BannerCover.vue";
import Heading from "../components/HeadingFile.vue";
import Answer from "../components/AnswerBox.vue";
const isLoading = ref(false);
const banner = {
  cover:
    "https://raw.githubusercontent.com/codewarrior1992/Time-Table/master/src/assets/image/banner/question.jpg",
  link: "question",
  zh: "常見問題",
  en: "BUS FAQ",
};

const faq = [
  {
    title: "如何檢舉公車交通違規事項？",
    paragraphOne: "公車交通違規事項可向本府警察局交通違規檢舉系統反應",
    paragraphTwo: "亦可洽詢交通警察大隊(02)2225-5999",
  },
  {
    title: "駕駛可以配戴藍牙耳機嗎？",
    paragraphOne:
      "目前並無法令強制規定限制駕駛於行駛中使用藍芽耳機，但基於行車安全，本局已宣導客運駕駛應秉持專心行駛，非不得已情況不使用。",
    paragraphTwo:
      "依據道路交通管理處罰條例第三十一條之一規定：「汽車駕駛人於行駛道路時，使用手持式行動電話進行撥接或通話者，處新臺幣3,000元罰鍰。」另因市區內路況瞬息萬變，為避免駕駛分心，無法注意突發狀況，仍不建議市區公車駕駛使用免持裝置接聽行動電話，以維民眾搭乘權益及用路人、車之安全。",
  },
  {
    title: "公車上可飲食嗎？",
    paragraphOne:
      "目前並無法令強制規定限制旅客飲食，但為維謢車內清潔環境，請駕駛委婉勸導。 ",
  },
  {
    title: "搭乘公車溢刷票卡如何處理？",
    paragraphOne:
      "可提供電子票證 (悠遊卡、一卡通、iCash2、HappyCash) 卡號等資料逕電洽各客運業者查詢退費。",
  },
  {
    title: "可攜帶寵物上公車及須另收費嗎？",
    paragraphOne: "目前各公司並無強制規定限制旅客攜帶寵物及訂定收費辦法。",
  },
  {
    title: "搭乘公車遺失物品如何協尋？",
    paragraphOne:
      "請直接向所搭乘公車路線調度站洽詢協助辦理，調度站電話可於公車站牌上的路線圖找到。",
    paragraphTwo: "亦可撥打所搭乘公車業者服務電話洽請公車業者協尋。",
  },
  {
    title: "如何申訴公車業者或查詢公車業者資料？",
    paragraphOne:
      " 如欲申訴，請提供乘車日期、時間、路線編號、車號與申訴情事。至各公車業者網址及各公車業者申訴電話撥打進行申訴。 ",
  },
];

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
    <section class="questions container">
      <Heading
        main="BUS FAQ"
        sub="公車常見問題"
        slogan="時常坐公車的您，是否有遇過司機的態度很不好、車上有人飲食亂丟垃圾等問題呢?"
      />
      <ul>
        <li v-for="(item, i) in faq" :key="i">
          <Answer :item="item" />
        </li>
      </ul>
    </section>
  </div>
</template>
