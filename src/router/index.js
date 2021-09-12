import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect:'/home'
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import("../views/home.vue"),
  },
  {
    path: "/goods",
    name: "goods",
    component: () =>
      import("../views/goods.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import("../views/detail.vue"),
  },
  {
    path: "/shoppingcart",
    name: "shoppingcart",
    component: () =>
      import("../views/shoppingcart.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
