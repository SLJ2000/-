<template>
       <!-- 导航、 -->
    <div class="navbar">
      <ul>
        <router-link  to="/shoppingcart">
        <li  style=" margin-right: 200px;">
          <i class="el-icon-shopping-cart-2"></i>
          购物车 {{getNum}}
          </li>
          </router-link>
          <router-link  to="/Collect">
            <li>我的收藏</li>
          </router-link>
        <router-link  to="/Order">
          <li>我的订单</li>
        </router-link>
        <div v-if="!this.$store.state.user">
          <li @click="register = true">注册</li>
          <li>/</li>
          <li @click="showlogin">登入</li>
        </div>
        

        <li v-else>
         <span>欢迎您 </span>
         <span>{{this.$store.state.user.userName}} </span>
          <span v-popover:popover @click="logout()">退出</span>
          <el-popconfirm
            ref="popover"
            title="这是一段内容确定删除吗？"
            trigger="click"
          >
            
          </el-popconfirm>
        </li>
      </ul>

 <MyRegister :register="register" @fromChild="isRegister"></MyRegister>
<Mylogin ></Mylogin>

     
    </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"

import MyRegister from "../components/MyRegister.vue"
import Mylogin from "../components/Mylogin.vue"
export default {
    name:'navbar',
    components:{
      MyRegister,
      Mylogin
    },
    data(){
        return{
          userName:'',
          password:'',
          register: false, // 是否显示注册组件
          
          // 登入表单
          formLabelWidth: '80px',
          dialogFormVisible: false,
          logintitle:false,

          // 注册表单
          dialogFormzhuce:false,

        }
    },
    created(){
        this.userName = this.$store.state.user.userName
    },
    methods:{
        ...mapActions(["setUser","setShowlogin"]),
        // 登入请求
        showlogin(){
          console.log("点击登录");
          this.$store.commit("setShowlogin",true)
          // this.$axios.post("/api/users/login", {
          //         userName: this.userName,
          //         password: this.password
          // }).then(res =>{
          //   // 异步操作
          //     if (res.data.code === "001") {
          //       console.log(res.data.user);
          //       this.dialogFormVisible = false;
                
                

          //       let user = JSON.stringify(res.data.user)
          //       localStorage.setItem("user", user);
          //       // 登录信息存到vuex
          //       this.setUser(res.data.user);
          //       this.logsec()
          //     }else{
          //       this.logintitle = true

          //       this.setShowlogin("false")
                
          //     }
          // })
        },

        // 退出登录
        logout() {
            
            // 清空本地登录信息
            this.$store.commit("setShowlogin",false)
            // this.setShowlogin("false")
            localStorage.setItem("user", "");
            // 清空vuex登录信息
            this.setUser("");
            // this.notifySucceed("成功退出登录");
            console.log(this.$store.state.showlogin);
            this.logoutsec();
        },

        logsec() {
          this.$message('登入成功！');
        },
        logoutsec(){
          this.$message('退出成功！');
        },
        
        isRegister(val) {
          this.register = val;
        },
    },
    computed:{
        ...mapGetters(["getUser","getShowlogin","getNum"]),
        
    },
    

}
</script>
<style scoped>
.navbar{
  
  color: rgb(182, 182, 182);
  background-color: rgb(63, 62, 62);
  height: 40px;
}
.navbar li{
  float: right;
  margin-right: 20px;
  line-height: 40px;
  /* li 设为行内块级， */
  display: block;
}
.navbar li:hover{
  color: white;
}
a {
   color: rgb(182, 182, 182);
    text-decoraction: none;
}

</style>