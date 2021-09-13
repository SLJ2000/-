<template>
    <!-- 内容 -->
    <!-- <div class="box">
        <div class="title"><p>手机</p></div>
        <div class="box1">
            <div class="left">
                <div class="right-content-style">
                    <img width="250" height="312px" :src="$target +'public/imgs/appliance/appliance-promo1.png'" />
                </div>
                <div style="margin-top:20px" class="right-content-style">
                    <img width="250" height="312px" :src="$target +'public/imgs/appliance/appliance-promo2.png'" />
                </div>
                
            </div> -->
            <div class="right">
                <div class="right-content" v-for="item,index in list" :key="index">
                    <router-link :to="{ path: '/detail', query: {productID:item.product_id} }">

                        <div class="right-content-style">
                                <img width="180px" :src="$target + item.product_picture" alt="">
                                <p style="margin-top:10px">{{item.product_name}}</p>
                                <p style="color: rgb(167, 166, 166);">{{item.product_title}}</p>
                                <div class="text">
                                    <span class="span">{{item.product_selling_price}}元 </span>
                                    <span style="text-decoration: line-through;color: rgb(167, 166, 166);"> {{item.product_price}}元</span>
                            </div>
                        </div>
                    </router-link>
                </div>

                <router-link :to="{ path: '/Goods', query: {categoryID:categoryID} }">
                    <div v-if="currentindex" class="right-content">
                        <div class="eight">
                            <span style="line-height: 312px;">浏览更多》</span>
                        </div>
                    </div>
                </router-link>
            </div>
        <!-- </div>
    </div> -->
</template>
<script>
export default {
    name:'Mylist',
    data(){
        return{
            abd:0
        }
    },
    props:{
        currentindex:{
            type:Boolean,
            default:false
        },
        list:""
    },
     computed: {
        // 通过list获取当前显示的商品的分类ID，用于“浏览更多”链接的参数
        categoryID: function() {
        let categoryID = [];
        if (this.list != "") {
            for (let i = 0; i < this.list.length; i++) {
                const id = this.list[i].category_id;
                if (!categoryID.includes(id)) {
                    categoryID.push(id);
                }
            }
        }
        return categoryID;
        }
    },
}
</script>
<style scoped>
    /* 内容 */

.left{
    margin-top:20px;
    flex: 1;
}
.right{
    
    flex: 4;
    display: flex;
    flex-wrap:wrap;
}
.right-content{
    margin-top: 10px;
    width: 260px;
    text-align: center;
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
.text{
    margin-top: 10px;

}
.text .span{

    font-size: 23px;
    color: coral;
}

.eight{
    margin-left: 7px;
    height: 312px;
    background-color: #fff;
    width: 250px;
    
}
.eight span:hover{
    color: coral;
}
/* 消除router link 下划线 */
a {
    color: black;
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>