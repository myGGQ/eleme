<!--
 * @Author: your name
 * @Date: 2020-04-13 15:10:24
 * @LastEditTime: 2020-04-21 23:04:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\shopcart\shopcart.vue
 -->
<template>
<div class="cart">
  <div class="shopcart">
      <div class="content">
          <div class="content-left" @click="toggleList">
              <div class="wrapper-logo">
                  <div class="logo" :class="{'highlight':totalCount>0}">
                      <span class="iconfont icon-gouwuchekong" :class="{'highlight':totalCount>0}"></span>
                  </div>
                  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="pice" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" :class="payClass" @click="pay">
              <div class="pay">{{payDesc}}</div>
          </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="cartClear">清空</span>
          </div>
          <div class="list-content">
              <ul>
                  <li class="food" v-for="food in selectFoods">
                      <span class="name">{{food.name}}</span>
                      <div class="price">
                          <span>￥{{food.price*food.count}}</span>
                      </div>
                      <div class="cartcontrol-warpper">
                          <cartcontrol :food="food"></cartcontrol>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
  <div class="list-mask" v-show="listShow" @click="close"></div>
</div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'

export default {
    data() {
            return {
                fold: false
            }
        },
    props: {
        selectFoods: {
            type: Array,
            default() {
                return [
                    {
                        price:10,
                        count:2,
                    },
                ]
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
             type: Number,
             default: 0
        }  
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if(this.totalPrice === 0){
                return `￥${this.minPrice}起送`;
            }else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice-this.totalPrice;
                return `还差${diff}元起送`;
            }else{
                return `去结算`;
            }
        },
        payClass() {
            if(this.totalPrice >= this.minPrice){
                return 'enough';
            }else{
                return 'not-enough';
            }
        },
        listShow() {
            if(this.totalCount){
                return this.fold;
            }else if(!this.totalCount){
                return this.fold = false;
            }
        }
    },
    methods: {
        //购物车详情的显示与隐藏
        toggleList() {
            if(this.totalCount){
                this.fold = !this.fold
            } 
        },
        //清空购物车
        cartClear() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            })
        },
        pay() {
            if(this.totalPrice < this.minPrice){
                return;
            }
            window.alert(`需要支付${this.totalPrice}元`);
        },
        close() {
            return this.fold = false;
        }
    },
    components:{
        cartcontrol
    }

}
</script>

<style scoped>
.shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 116px;
    z-index: 50; 
}
.shopcart>.content{
    display: flex; 
    background: #141d27; 
    font-size: 0;
}
.shopcart>.content>.content-left{
    flex: 1;
    color: rgba(255, 255, 255, 0.4);
}
.shopcart>.content>.content-left>.wrapper-logo{
    display: inline-block;
    position: relative;
    vertical-align: top;
    top: -20px;
    margin: 0 24px;
    padding: 12px;
    width: 112px;
    height: 112px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
}
.shopcart>.content>.content-left>.wrapper-logo>.highlight{
    background: rgb(0, 160, 220);
}
.shopcart>.content>.content-left>.wrapper-logo>.logo{
    width: 100%;
    height: 100%;
    border-radius: 50%; 
    text-align: center;
    color: #80858a;
}
.shopcart>.content>.content-left>.wrapper-logo>.logo>.icon-gouwuchekong{
    line-height: 98px;
    font-size: 48px;
}
.shopcart>.content>.content-left>.wrapper-logo>.highlight{
    color: #fff;
}
.shopcart>.content>.content-left>.wrapper-logo>.num{
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 32px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
}
.shopcart>.content>.content-left>.pice{
    display: inline-block;
    vertical-align: top;
    margin-top: 24px;
    line-height: 44px;
    padding-right: 24px;
    box-sizing: border-box;
    border-right: 2px solid rgba(255, 255, 255, 0.1);
    font-size: 32px;
    font-weight: 700;
}
.shopcart>.content>.content-left>.highlight{
    color: #fff;
}
.shopcart>.content>.content-left>.desc{
    display: inline-block;
    vertical-align: top;
    margin: 22px 0 0 20px;
    line-height: 48px;
    font-size: 20px;
}
.shopcart>.content>.content-right{
    flex: 0 0 190px;
    width: 190px;
}
.shopcart>.content>.content-right>.pay{
    height: 100%;
    vertical-align: top;
    line-height: 96px;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}
.shopcart>.content>.not-enough{
    color: rgba(255, 255, 255, 0.4);
    background: #2b333b;
}
.shopcart>.content>.enough{
    background: #00b43c;
    color: #fff;
}
.shopcart>.shopcart-list{
    position:fixed;
    bottom: 113px;
    z-index: -1;
    width: 100%;
    background: #fff;
}
.shopcart>.shopcart-list>.list-header{
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #f3f5f7;
}
.shopcart>.shopcart-list>.list-header>.title{
    float: left;
    font-size: 28px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    padding: 0 36px;
}
.shopcart>.shopcart-list>.list-header>.empty{
    float: right;
    font-size: 24px;
    color: rgb(0, 160, 220);
    padding: 0 36px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.shopcart-list>.list-content{
    width: 100%;
    max-height: 434px;
    overflow: auto;
}
.shopcart-list>.list-content>ul>.food{
    width: 90%;
    height: 96px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    position: relative;
}
.shopcart-list>.list-content>ul>.food>.name{
    line-height: 96px;
    font-size: 29px;
    color: rgb(1, 17, 27);
}
.shopcart-list>.list-content>ul>.food>.price{
    font-size: 28px;
    font-weight: 700;
    color: rgb(240, 20, 20);
    position: absolute;
    right: 180px;
    bottom: 36px;
}
.shopcart-list>.list-content>ul>.food>.cartcontrol-warpper{
    position: absolute;
    right: 0;
    bottom: 12px;
}
.cart>.list-mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.6);
    filter: blur(10px);
}
</style>