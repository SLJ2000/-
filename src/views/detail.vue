<template>
    <div id="bg">
        <!-- 顶部 -->
        <div class="title">
            <div class="title-content">
                <span>{{productDetails.product_name}}</span>
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                    <li>用户评价</li>
                </ul>
            </div>
        </div>
        <!-- 顶部 end-->

        <!-- 内容 -->
        <div class="box">
            <div class="box-left">
                  <div class="block">
                        <el-carousel indicator-position="outside" height="550px">
                        <el-carousel-item v-for="item in productPicture" :key="item.id">
                            <img width="600px" :src="$target + item.product_picture" alt="">
                        </el-carousel-item>
                        </el-carousel>
                </div>
            </div>

            <div class="box-right">

                <div class="box-right-top">
                    <p style="font-size:25px;margin-top:10px">{{productDetails.product_name}}</p>
                    <p style="color:rgb(167, 166, 166);margin-top:10px">{{productDetails.product_intro}}</p>
                    <p style="color:coral;margin-top:10px">小米自营</p>
                    <p style="margin-top:30px">
                        <span style="font-size:22px;
                        color:coral;margin:10px 10px 0px 0px">
                            {{productDetails.product_selling_price}}元
                        </span>
                        <span style="text-decoration: line-through;
                        color: rgb(167, 166, 166);">
                            {{productDetails.product_price}}元
                        </span>
                    </p>
                </div>
                
                <div class="box-right-bottom">
                    <p style="margin:0px 50px;line-height:60px;">
                        <span >{{productDetails.product_name}}</span>
                        <span style="text-decoration:line-through;float:right;margin-left:10px">{{productDetails.product_price}}元</span>
                        <span style="float:right;">{{productDetails.product_selling_price}}元</span>
                    </p>
                    <p style="margin:20px 0px 0px 50px ;color:coral;font-size:25px">
                        <span >总价：{{productDetails.product_selling_price}}</span>
                    </p>
                </div>

                <div class="button">
                    <el-button :disabled="dis" @click="addShoppingCart" class="shop-cart">加入购物车</el-button>
                    <el-button class="like" @click="addCollect">收藏</el-button>
                </div>
                <!-- 底部信息 -->
                <div class="pro-policy">
                    <ul>
                        <li>
                        <i class="el-icon-circle-check"></i> 小米自营
                        </li>
                        <li>
                        <i class="el-icon-circle-check"></i> 小米发货
                        </li>
                        <li>
                        <i class="el-icon-circle-check"></i> 7天无理由退货
                        </li>
                        <li>
                        <i class="el-icon-circle-check"></i> 7天价格保护
                        </li>
                    </ul>
                </div>
                <!-- 底部信息 END -->
            </div>
        </div>
        <!-- 内容 end-->
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name:'home',
    data(){
        return{
            productID:'',
            productDetails:'',
            productPicture:'',
            dis:false,  //当购物车到达10个时，不给添加
        }
    },
    created(){

    },
    activated(){
        if (this.$route.query.productID != undefined) {
            this.productID = this.$route.query.productID;
        }
    },
     watch: {
    // 监听商品id的变化，请求后端获取商品数据
        productID: function(val) {
            this.getDetails(val);
            this.getDetailsPicture(val);
        }
    },
    methods:{
        ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),

        // 获取商品详细信息
        getDetails(val) {
        this.$axios
            .post("/api/product/getDetails", {
            productID: val
            })
            .then(res => {
                console.log(res.data.Product[0]);
                this.productDetails = res.data.Product[0];
            })
            .catch(err => {
            return Promise.reject(err);
            });
        },
        // 获取商品图片
        getDetailsPicture(val) {
        this.$axios
            .post("/api/product/getDetailsPicture", {
            productID: val
            })
            .then(res => {
                console.log(res.data.ProductPicture)
                this.productPicture = res.data.ProductPicture;
            })
            .catch(err => {
            return Promise.reject(err);
            });
        },
        // 加入购物车
        addShoppingCart() {
        // 判断是否登录,没有登录则显示登录组件
        if (!this.$store.getters.getUser) {
            this.$store.dispatch("setShowlogin", true);
            return;
        }
        this.$axios
            .post("/api/user/shoppingCart/addShoppingCart", {
            user_id: this.$store.getters.getUser.user_id,
            product_id: this.productID
            })
            .then(res => {
            switch (res.data.code) {
                case "001":
                // 新加入购物车成功
                this.unshiftShoppingCart(res.data.shoppingCartData[0]);
                this.open1(res.data.msg);
                break;
                case "002":
                // 该商品已经在购物车，数量+1
                this.addShoppingCartNum(this.productID);
                this.open1(res.data.msg);
                break;
                case "003":
                // 商品数量达到限购数量
                this.dis = true;
                this.open1(res.data.msg);
                break;
                default:
                this.open1(res.data.msg);
            }
            })
            .catch(err => {
            return Promise.reject(err);
            });
        },
        //  我的收藏
        addCollect() {
        // 判断是否登录,没有登录则显示登录组件
        if (!this.$store.getters.getUser) {
            this.$store.dispatch("setShowLogin", true);
            return;
        }
        this.$axios
            .post("/api/user/collect/addCollect", {
            user_id: this.$store.getters.getUser.user_id,
            product_id: this.productID
            })
            .then(res => {
            if (res.data.code == "001") {
                // 添加收藏成功
                this.open1(res.data.msg);
            } else {
                // 添加收藏失败
                this.open1(res.data.msg);
            }
            })
            .catch(err => {
            return Promise.reject(err);
            });
        },
        // 弹框信息
        open1(val) {
            const h = this.$createElement;

            this.$notify({
            title: val,
        });
      },
    }
}
</script>
<style scoped>

/* 顶部样式 */
.title{
    height: 65px;
    width: 100%;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
.title-content{
    margin: 0 auto;
    height: 65px;
    width: 1300px;
}
.title-content span{
    font-size: 25px;
    line-height: 65px;
}
.title-content ul {
    line-height: 65px;
    float: right;
    display: inline-block;
}
.title-content ul li{
    margin-left: 8px;
    display: inline;
}
.title-content ul li:hover{
    color: coral;
}
/* 顶部样式  END */

/* 内容样式 */
.box{
    height: 600px;
    width: 1300px;
    margin: 30px auto 0px;
    display: flex;
}
.box-left{
    flex: 4;
}
.box-right{
    padding-left: 20px;
    flex: 5;
}
.box-right-top{
    width: 100%;
    height: 230px;
    border-bottom: 1px rgb(228, 228, 228) solid;
}
.box-right-bottom{
    margin-top: 50px;
    width: 100%;
    height: 150px;
    background-color: rgb(228, 228, 228);
}
.button{
    
    margin-top: 40px;
    height: 70px;
}
.shop-cart {
    color: white;
    height: 60px;
    width: 360px;
    background-color: #ff6700;
}
.shop-cart:hover {
    background-color: #f25807;
}
.like{
    color: white;
    height: 60px;
    width: 280px;
    margin-left: 70px;
    background-color: #b0b0b0;
}
.like:hover {
    background-color: #757575;
}
.pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 内容样式 end */
</style>