import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dynamics",
      name: "dynamics",
      component: () => import("../views/DynamicsView.vue"),
    },
    {
      path: "/question",
      name: "question",
      component: () => import("../views/QuestionView.vue"),
    },
  ],
});

export default router;
