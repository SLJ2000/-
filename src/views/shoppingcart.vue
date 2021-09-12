<template>
    <div >
        <div class="top">
            <div class="top-content">
                <p>
                    <i class="el-icon-shopping-cart-full" style="color:#ff6700; font-weight: 600;"></i>
                    我的购物车
                </p>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </div>
            
        </div>
        <div class="content">
            <!-- 表头 -->
            <div class="content-menu">
                <div class="bo1">
                    <el-checkbox v-model="isAllCheck"><span style="font-size:20px">全选</span></el-checkbox>
                </div>
                <div class="bo2" style="text-align:center">
                    <span>商品名称</span>
                </div>
                <div class="bo3">
                    <span>单价</span>
                </div>
                <div class="bo4">
                    <span>数量</span>
                </div>
                <div class="bo5">
                    <span>小计</span>
                </div>
                <div class="bo6">
                    <span>操作</span>
                </div>
            </div>
            <!-- 表头 end-->

            <!-- 商品列表 -->
            <div v-for="item,index in getShoppingCart" :key="index" class="content-detail">
                <div class="bo1">
                    <el-checkbox v-model="item.check" @change="checkChange($event,index)"></el-checkbox>
                </div>
                <div class="bo2">
                    <img width="120px" :src="$target + item.productImg" alt="">
                    <span >{{item.productName}}</span>
                </div>
                <div class="bo3">
                    <span>{{item.price}}元</span>
                </div>
                <div class="bo4">
                    <p>
                        <el-input-number
                        size="small"
                        :value="item.num"
                        @change="handleChange($event,index,item.productID)"
                        :min="1"
                        :max="item.maxNum"
                        ></el-input-number>
                    </p>
                </div>
                <div class="bo5">
                    <span>{{item.price * item.num}}元</span>
                </div>
                <div class="bo6">
                    <el-popconfirm @confirm="delect($event,item.id,item.productID)" 
                    title="确定删除该商品吗？"
                    >
                    <el-button slot="reference">删除</el-button>
                    </el-popconfirm>
                </div>
            </div>
            <!-- 商品列表end -->

            <!-- 总价 -->
            <div class="total">
                <div style="flex:2">
                    <span>共 {{getNum}} 件商品，已选择 {{getCheckNum}}件</span>
                </div>
                <div style="flex:2;text-align:right">
                    <span style="color:coral;font-size:22px">总价：{{getTotalPrice}}元</span>
                </div>
                <router-link :to="getCheckNum > 0 ? '/home' :''">
                    <div :class="getCheckNum > 0 ? 'btn-primary' : 'btn'">
                        <span style="line-height:60px">结算</span>
                    </div>
                </router-link>
            </div>
            <!-- 总价 end-->
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    name:"shoppingcart",
    created(){
        console.log(this.$store.state.shoppingCart);
    },
    methods:{
        ...mapActions(["updateShoppingCart", "deleteShoppingCart", "checkAll"]),
        // 修改商品数量的时候调用该函数
        handleChange(currentValue, key, productID) {
            console.log("$event" + currentValue);
            // 当修改数量时，默认勾选
            this.updateShoppingCart({ key: key, prop: "check", val: true });
            // 向后端发起更新购物车的数据库信息请求
            this.$axios
                .post("/api/user/shoppingCart/updateShoppingCart", {
                user_id: this.$store.getters.getUser.user_id,
                product_id: productID,
                num: currentValue
                })
                .then(res => {
                switch (res.data.code) {
                    case "001":
                    // “001”代表更新成功
                    // 更新vuex状态
                    this.updateShoppingCart({
                        key: key,
                        prop: "num",
                        val: currentValue
                    });
                    // 提示更新成功信息
                    this.open1(res.data.msg);
                    break;
                    default:
                    // 提示更新失败信息
                    this.open1(res.data.msg);
                }
                })
                .catch(err => {
                return Promise.reject(err);
                });
        },

        
        // 向后端发起删除购物车的数据库信息请求
        delect(e, id, productID){
            this.$axios
            .post("/api/user/shoppingCart/deleteShoppingCart", {
            user_id: this.$store.getters.getUser.user_id,
            product_id: productID
            })
            .then(res => {
            switch (res.data.code) {
                case "001":
                // “001” 删除成功
                // 更新vuex状态
                this.deleteShoppingCart(id);
                // 提示删除成功信息
                this.open1(res.data.msg);
                break;
                default:
                // 提示删除失败信息
                this.open1(res.data.msg);
            }
            })
            .catch(err => {
            return Promise.reject(err);
            });
        },
        // 取消商品选中
        checkChange(val, key){
            this.updateShoppingCart({ key: key, prop: "check", val: val });
        },
        // 弹框信息
        open1(val) {
            this.$notify({
            title: val,
        });
      },
    },
    computed: {
        ...mapGetters([
            "getShoppingCart",
            "getCheckNum",
            "getTotalPrice",
            "getNum"
        ]),
        // 全选
        isAllCheck: {
            get() {
                return this.$store.getters.getIsAllCheck;
            },
            set(val) {
                this.checkAll(val);
            }
        }
    }
};
</script>
<style scoped>
/* 顶栏容器 */
.top{
    height: 80px;
    width: 100%;
    border-bottom: 2px coral solid;
}
.top-content{
    width: 1300px;
    margin: 0 auto;
}
.top-content p{
    line-height: 90px;
    font-size: 28px;
    float: left;
}
.top-content span{
    margin-left: 10px;
    color:rgb(128, 128, 128);
     line-height: 105px;
}
/* 顶栏容器 end */

/* 内容 */
.content{
    padding: 20px 0px;
    height: 100%;
    width: 100%;
    background-color: rgb(238, 238, 238);

}
.content-menu{
    margin: 0 auto;
    height: 80px;
    width: 1300px;
    background-color: #fff;
    border-bottom: 1px solid rgb(221, 220, 220);
}
.content-menu div{
    font-size: 18px;
    line-height: 80px;
    display: inline-block;
}
.content-detail{
    height: 120px;
    width: 1300px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid rgb(221, 220, 220);
}
.content-detail div{
    margin: auto 0;
}
.bo1{
    
    text-align: center;
    width: 160px;
}
.bo2{
    display: flex;
    width: 480px;
    
}
.bo2 img{
    width: 120px;
    height: 110px;
}
.bo2 span{
    margin: auto 75px;
}
.bo3{
    width: 170px;
    text-align: center;
}
.bo4{
    width: 140px;
    text-align: center;
}

.bo5{
    width: 190px;
    text-align: center;
}
.bo6{
    width: 160px;
    text-align: center;
}
/* 内容 */

.total{
    height: 60px;
    width: 1300px;
    background-color: #fff;
    margin: 20px auto 0px;
    display: flex;
}
.total div{
    line-height: 60px;
}
.btn-primary{
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #ff6700;
    color: #fff;
}
.btn-primary:hover{
    background: #cf5a0b;
}
.btn{
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #e0e0e0;
    color: #b0b0b0;
}
</style>