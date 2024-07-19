import Homepage from "@/views/Homepage.vue";
import ActivitePage from "@/views/ActivitePage.vue";
import SocietePage from "@/views/SocietePage.vue";
import SummaryPage from "@/views/SummaryPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path: "/company",
    name: "company",
    component: SocietePage,
  },
  {
    path: "/activity",
    name: "activity",
    component: ActivitePage,
  },
  {
    path: "/summary",
    name: "summary",
    component: SummaryPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const pageState = store.state.navigation.pageState;
    const canGotoPage =
      pageState.home.completed &&
      pageState.activity.completed &&
      pageState.information.completed;
    if (!canGotoPage) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
