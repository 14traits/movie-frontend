import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import MoviesIndex from "../views/MoviesIndex.vue";
import MoviesNew from "../views/MoviesNew.vue";
import MoviesShow from "../views/MoviesShow.vue";
import MoviesEdit from "../views/MoviesEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  { path: "/signup", name: "signup", component: SignupView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/logout", name: "logout", component: LogoutView },
  { path: "/movies", name: "movie_index", component: MoviesIndex },
  { path: "/movies/new", name: "movies-new", component: MoviesNew },
  { path: "/movies/:id", name: "movies_show", component: MoviesShow },
  { path: "/movies/:id/edit", name: "movies_edit", component: MoviesEdit },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
