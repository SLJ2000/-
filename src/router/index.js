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
    path: "/Goods",
    name: "Goods",
    component: () =>
      import("../views/Goods.vue"),
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
  {
    path: "/ConfirmOrder",
    name: "ConfirmOrder",
    component: () =>
      import("../views/ConfirmOrder.vue"),
  },
  {
    path: "/Order",
    name: "Order",
    component: () =>
      import("../views/Order.vue"),
  },
  {
    path: "/Collect",
    name: "Collect",
    component: () =>
      import("../views/Collect.vue"),
  },
  {
    path: "/About",
    name: "About",
    component: () =>
      import("../views/About.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
