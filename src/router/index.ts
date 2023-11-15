import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Results from "../views/SavedResults.vue";
import SignUp from "../views/SignUp.vue";
import TheForm from "../views/TheForm.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/views/sign-up", component: SignUp },
    {
      path: "/views/results",
      component: Results,
      meta: { requiresAuth: true },
    },
    { path: "/views/form", component: TheForm, meta: { requiresAuth: true } },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Du bist nicht berechtigt für diese Ansicht");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
