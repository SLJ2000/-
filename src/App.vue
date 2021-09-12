<template>
  <div id="app">
    <!-- 导航、 -->
    <navbar></navbar>

    <!-- 顶栏容器 -->
    <menus></menus>
    


    <keep-alive>
      <router-view/>
    </keep-alive>

     <!-- 底栏容器 -->
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon1" href="javascript:;">7天无理由退换货</a>
                <a class="icon2" href="javascript:;">满99元全场免邮</a>
                <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
              </p>
            </div>
          </div>
          <div class="github">
            <a href="https://github.com/hai-27/vue-store" target="_blank">
              <div class="github-but"></div>
            </a>
          </div>
          <div class="mod_help">
            <p>
              <router-link to="/home">首页</router-link>
              <span>|</span>
              <router-link to="/home">全部商品</router-link>
              <span>|</span>
              <router-link to="/home">关于我们</router-link>
            </p>
            <p class="coty">商城版权所有 &copy; 2012-2021</p>
          </div>
        </div>
      <!-- 底栏容器END -->
  </div>
</template>
<script>
import {mapActions} from "vuex"
import {mapGetters} from "vuex"

import navbar from "./views/navbar.vue"
import menus from "./views/menu.vue"
export default {
  name:'APP',
  components:{
    navbar,
    menus
  },
 
  data(){
    return{
      userName:'',
      password:'',
      
      // 登入表单
      formLabelWidth: '50px',
      dialogFormVisible: false,
      logintitle:false,
      
    }
  },
  created(){
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem('user')));
    }
  },
  methods:{
    ...mapActions(["setUser","setShowlogin","setShoppingCart"]),
  },
  computed: {
    ...mapGetters(["getUser","getShowlogin"])
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val === "") {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        console.log(val);
        // 用户已经登录,获取该用户的购物车信息
        this.$axios
          .post("/api/user/shoppingCart/getShoppingCart", {
            user_id: val.user_id
          })
          .then(res => {
            if (res.data.code === "001") {

              console.log(res);
              // 001 为成功, 更新vuex购物车状态
              this.setShoppingCart(res.data.shoppingCartData);
            } else {
              // 提示失败信息
              // this.notifyError(res.data.msg);
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
        }
    }
  },
}
</script>

<style>

* { 
  /* 清除样式 */
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app {
 
}
/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
}
.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("./assets/img/us-icon.png") no-repeat left 0;
}
.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}
.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url("./assets/img/github.png") no-repeat;
}
.footer .mod_help {
  text-align: center;
  color: #888888;
}
.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}
.footer .mod_help p span {
  padding: 0 22px;
}
/* 底栏容器CSS END */

</style>
