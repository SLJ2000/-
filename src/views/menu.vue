<template>
<div >
  <div class="top">
    <div class="img"><img src="../assets/img/logo.png" alt=""></div>
    <div class="ul">
      <ul>
        <li class="li" 
        v-for="item,index in menus" 
        :key="item"
        @click="click(index)"
        :class="{'active':currentindex==index}">
          {{item}}
        </li>
        
      </ul>
    </div>
    <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="search">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
        </el-input>
    </div>
  </div>

  <!-- <div class="tabs">
      <img class="img" src="../assets/img/logo.png" alt="">
      
      <el-tabs  class="pane" v-model="tabs" @tab-click="routeto" >
       
        <el-tab-pane label="用户管理"  name="/home"></el-tab-pane>
        <el-tab-pane label="配置管理" name="/goods"></el-tab-pane>
        <el-tab-pane label="角色管理" name="/detail"></el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
      </el-tabs>
  </div> -->
</div>
    
</template>
<script>
export default {
    name:'menus',
    data(){
        return{
          menus:["首 页","全部商品","关于我们"],
             // 顶栏容器
            // tabs:'/home'
          currentindex:"0",
          search:'',
        }
    },
    methods:{
      // 搜索
      searchClick(){
          if (this.search != "") {
            // 跳转到全部商品页面,并传递搜索条件
            this.$router.push({ path: "/Goods", query: { search: this.search } });
            this.search = "";
          }
      },
      click(index){
        console.log(index);
        this.currentindex = index
        switch(this.currentindex){
          case 1:
              this.$router.push("/Goods")
              break;
          case 2:
              this.$router.push("/About")
              break;
          default:
              this.$router.push("/home")
        }
      }
       // 跳转
        // routeto(tab, event){
        //   console.log(tab, event);
        //   console.log(tab.index);
        // this.$router.push(tab.name)
        // }
    }
}
</script>
<style scoped>
.top{
  margin: 0 auto;
  margin-top: 30px;
  height: 60px;
  width: 1300px;
  border-bottom: 1px solid rgb(190, 190, 190);
  
}
.ul{
  /* 解决行内块级元素不对齐 */
  vertical-align:middle;  
  display: inline-flex;
}
.li{
    display: inline-block;
    text-align: center;
    margin-top: 6px;
    width: 70px;
    margin-left: 50px;
    line-height: 50px;
}
.img{
  vertical-align:middle;
  display: inline-block;
}
.search{
  margin-top: 10px;
  float: right;
  width: 300px;
  height: 50px;
  display: inline-block;
}
.active{
  color: rgb(93, 192, 238);
    border-bottom: 3px solid rgb(93, 192, 238);

}
/* 
.tabs img {
  margin-top: 10px;
  margin-left: 200px;
}
.pane{
  display: inline-flex;
} */
</style>