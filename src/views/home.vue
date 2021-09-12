<template>
<div id="page">
    <div class="bgc">
    <!-- 轮播图 -->
        <div class="content">
            <el-carousel height="520px" :interval="5000" arrow="always">
                <el-carousel-item v-for="item,index in carousel" :key="index">
                    <img :src="$target+item.imgPath" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
    <!-- 手机内容 -->
    <div class="box">
        <div class="title"><p>手机</p></div>
        <div class="box1">
            <div class="left">
                <img width="250" height="637px" :src="$target +'public/imgs/phone/phone.png'" />
            </div>
            <Mylist :list="phoneList"></Mylist>
            
        </div>
    </div>

    <!-- 家电内容 -->
    <div class="box">
        <div style="text-align: justify" class="title">
            <span>家电</span>
            <ul>
                <!-- @mouseover="hover2" -->
                <li  @mouseover="hover1"><span :class="{'active':jiadianisshow == true}">热门</span></li>
                <li  @mouseover="hover2"><span :class="{'active':jiadianisshow == false}">电视影音</span></li>
            </ul>
        </div>
        <div class="box1">
            <div class="left">
                <div class="right-content-style">
                    <img width="250" height="312px" :src="$target +'public/imgs/appliance/appliance-promo1.png'" />
                </div>
                <div style="margin-top:13px" class="right-content-style">
                    <img width="250" height="312px" :src="$target +'public/imgs/appliance/appliance-promo2.png'" />
                </div>
            </div>
            <Mylist v-show="jiadianisshow" :list="applianceList" ></Mylist>
            <Mylist v-show="!jiadianisshow" :list="miTvList" ></Mylist>
            
        </div>
    </div>

    <!-- 配件内容 -->
    <div class="box">
        <div style="text-align: justify" class="title">
            <span>配件</span>
            <ul>
                <!-- @mouseover="hover2" -->
                <li  @mouseover="hover(1)"><span :class="{'active':list == 1}">热门</span></li>
                <li  @mouseover="hover(2)"><span :class="{'active':list == 2}">保护套</span></li>
                <li  @mouseover="hover(3)"><span :class="{'active':list == 3}">充电器</span></li>
            </ul>
        </div>
        <div class="box1">
            <div class="left">
                <div class="right-content-style">
                    <img width="250" height="312px" :src="$target +'public/imgs/accessory/accessory-promo1.png'" />
                </div>
                <div style="margin-top:13px" class="right-content-style">
                    <img width="250" height="312px" :src="$target +'public/imgs/accessory/accessory-promo2.png'" />
                </div>
            </div>
            <Mylist v-show="list == 1" :list="accessoryList" ></Mylist>
            <Mylist v-show="list == 2" :list="protectingShellList" ></Mylist>
            <Mylist v-show="list == 3" :list="chargerList" ></Mylist>
        </div>
    </div>
</div>
</template>
<script>
import Mylist from "../components/Mylist.vue"
export default {
    name:'name',
    components:{
        Mylist
    },
    data(){
        return {
            carousel:[],
            phoneList:'', //手机列表
            
            applianceList:'', //热门列表
            miTvList:'', //电视列表
            jiadianisshow:true,

            chargerList:'',  //充电器
            protectingShellList:'',    // 保护套
            accessoryList:'',   // 热门
            list:1,
        }
    },
    created(){
         // 获取轮播图数据
        this.$axios
            .post("/api/resources/carousel", {})
        .then(res => {
            console.log(res.data.carousel);
            this.carousel = res.data.carousel;
        }).catch(err => {
                return Promise.reject(err);
        });

        // 获取各类商品数据
        this.getPromo("手机", "phoneList");

        this.getPromo("电视机", "miTvList");
        this.getPromo(   //热门
            ["电视机", "空调", "洗衣机"],
            "applianceList",
            "/api/product/getHotProduct"
        );

        this.getPromo("保护套", "protectingShellList");
        this.getPromo("充电器", "chargerList");
        this.getPromo(
            ["保护套", "保护膜", "充电器", "充电宝"],
            "accessoryList",
            "/api/product/getHotProduct"
        );
    },
    methods:{
        // 获取各类商品数据方法封装
        getPromo(categoryName, val, api) {
            api = api != undefined ? api : "/api/product/getPromoProduct";
            this.$axios.post(api, {categoryName}).then(res => {
            this[val] = res.data.Product;
            this[val].push("浏览更多")

            console.log(this[val]);
        }).catch(err => {
            return Promise.reject(err);
        });
        },
        // 聚焦事件
         hover1(){
             this.jiadianisshow = true
        },
        hover2(){
            this.jiadianisshow = false
        },
        hover(val){
            this.list = val
        }
    },
}
</script>
<style scoped>
#page{
    width: 100%;
    height: 100%;
    background-color: rgb(243, 243, 243);
}
.bgc{
    background-color: white;
}
.content{
    height: 540px;
    width: 1300px;
    margin: 0 auto;
    padding-top: 20px;
}

/* 内容 */
.box{
    margin: 0 auto;
    height: 720px;
    width: 1300px;
}
.box1{
    margin-top: 10px;
    height: 650px;
    width: 1300px;
    display: flex;
}
.title p, span{
    color: rgb(151, 151, 151);
    margin-top: 10px;
    font-size: 25px;
}
.title ul{
    display: inline-flex;
    float: right;
}
.title ul li{
    margin-left: 20px;
}

.active{
    color: coral;
    border-bottom: 2px solid coral;
}
.left{
    flex: 1;
}

.right-content-style:hover,.eight:hover{
    z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
    
}
.right-content-style{
    -webkit-flex-wrap:wrap;
    margin-left: 7px;
    background-color: #fff;
    height: 312px;
    width: 250px;
    /* border: 5px solid rgb(243, 243, 243);; */
}

</style>