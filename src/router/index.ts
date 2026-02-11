import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { APP_TITLE } from "@/lib/constants";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/layout/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/HomePage.vue"),
        meta: { title: "Home", requiresAuth: false },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
        meta: { title: "Dashboard", requiresAuth: true },
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/pages/SettingsPage.vue"),
        meta: { title: "Settings", requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
    meta: { title: "Login", requiresAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/NotFoundPage.vue"),
    meta: { title: "Not Found", requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  document.title = `${to.meta.title ?? "App"} — ${APP_TITLE}`;

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.name === "login" && authStore.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;
