<!--
 * @Author: your name
 * @Date: 2019-12-15 21:03:13
 * @LastEditTime: 2020-04-23 22:24:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\seller\seller.vue
 -->
<template>
<div class="seller" ref="seller">
    <div class="seller-content">
        <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
            <div class="desc">
                <Rate disabled allow-half v-model="seller.score" />
                <span class="text">({{seller.ratingCount}})</span>
                <span class="text">月售{{seller.sellCount}}单</span>
            </div>
            <ul class="remark">
                <li class="block">
                    <h2>起送价</h2>
                    <div class="content">
                        <span class="stress">{{seller.minPrice}}</span>元
                    </div>
                </li>
                <li class="block">
                    <h2>商家配送</h2>
                    <div class="content">
                        <span class="stress">{{seller.deliveryPrice}}</span>元
                    </div>
                </li>
                <li class="block">
                    <h2>平均配送时间</h2>
                    <div class="content">
                        <span class="stress">{{seller.deliveryTime}}</span>分钟
                    </div>
                </li>
            </ul>
            <div class="xin">
                <i class="iconfont icon-ziyuan" :class="{'back':back}" @click="backXin"></i>
                <h3 class="title" v-show="!back">收藏</h3>
                <h3 class="title" v-show="back">已收藏</h3>
            </div>
        </div>
        <split></split>
        <div class="bulletin">
            <h1 class="title">公告与活动</h1>
            <div class="content-wrapper">
                <p class="content">{{seller.bulletin}}</p>
            </div>
            <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
            <h1 class="title">商家实景</h1>
            <div class="pic-wrapper">
                <ul class="pic-list">
                    <li class="pic-item" v-for="pic in seller.pics">
                        <img :src="pic" alt="" width="240px" height="180px">
                    </li>
                </ul>
            </div>
        </div>
        <split></split>
        <div class="message">
            <h1 class="title">商家信息</h1>
            <ul>
                <li v-for="mes in seller.infos" class="mes-item">
                    <p class="text">{{mes}}</p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import split from '../split/split.vue'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return{
            back: false
        }
    },
    created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    // watch: {
    //     'seller'() {
    //         this._initScroll();
    //     }
    // },
    // ready() {
    //     this._initScroll();
    // },
    methods: {
        // _initScroll() {
        //     if(!this.scroll){
        //     this.scroll = new BScroll(this.$refs.seller,{
        //         click: true,
        //         });
        //     }else{
        //         this.scroll.refresh();
        //     }
        // },
        backXin() {
            this.back = !this.back
        }
    },
    components: {
        split
    }
}
</script>

<style scoped>
.seller{
    position: absolute;
    left: 0;
    top: 356px;
    bottom: 0;
    width: 100%;
    overflow: auto;
}
.seller>.seller-content>.overview{
    position: relative;
    padding: 36px;
}
.seller>.seller-content>.overview>.xin{
    position: absolute;
    top: 30px;
    right: 36px;
    width: 60px;
    text-align: center;
}
.seller>.seller-content>.overview>.xin>.iconfont{
    font-size: 30px;
}
.seller>.seller-content>.overview>.xin>.back{
    color: rgb(240, 20, 20);
}
.seller>.seller-content>.overview>.xin>.title{
    font-size: 20px;
}
.seller>.seller-content>.overview>.title{
    margin-bottom: 16px;
    line-height: 28px;
    font-size: 28px;
    color: rgb(7, 17, 27);
}
.seller>.seller-content>.overview>.desc{
    padding-bottom: 36px;
    font-size: 0;
    /* line-height: 36px; */
    color: rgb(77, 85, 93);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller>.seller-content>.overview>.desc>.ivu-rate{
    display: inline-block;
    vertical-align: top;
    line-height: 36px;
    font-size: 30px;
    margin-right: 16px;
}
.seller>.seller-content>.overview>.desc>.text{
    display: inline-block;
    vertical-align: top;
    margin-right: 24px;
    line-height: 36px;
    font-size: 20px;
}
.seller>.seller-content>.overview>.remark{
    display: flex;
    padding-top: 36px;
}
.seller>.seller-content>.overview>.remark>.block{
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.seller>.seller-content>.overview>.remark>.block:last-child{
    border: none;
}
.seller>.seller-content>.overview>.remark>.block>h2{
    padding-bottom: 8px;
    font-size: 20px;
    line-height: 20px;
    color: rgb(147, 153, 159);
}
.seller>.seller-content>.overview>.remark>.block>.content{
    font-size: 20px;
}
.seller>.seller-content>.overview>.remark>.block>.content>.stress{
    font-size: 48px;
    font-weight: 200;
    line-height: 48px;
    color: rgb(7, 17, 27);
}
.bulletin{
    padding: 36px 36px 0 36px;
}
.bulletin>.title{
    font-size: 28px;
    line-height: 28px;
    color: rgb(7, 17, 27);
    margin-bottom: 16px;
}
.bulletin>.content-wrapper{
    padding: 0 24px 32px 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.bulletin>.content-wrapper>.content{
    font-size: 24px;
    font-weight: 200;
    line-height: 42px;
    color: rgb(240, 20, 20);
}
.bulletin>.supports>.supports-item{
    padding: 32px 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
}
.bulletin>.supports>.supports-item>.icon{
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: top;
    margin-right: 12px;
    background-size: 32px 32px;
    background-repeat: no-repeat;
}
.bulletin>.supports>.supports-item>.decrease{
    background-image:url(./img/decrease_2@2x.png);
}
.bulletin>.supports>.supports-item>.discount{
    background-image:url(./img/discount_2@2x.png);
}
.bulletin>.supports>.supports-item>.guarantee{
    background-image:url(./img/guarantee_2@2x.png);
}
.bulletin>.supports>.supports-item>.invoice{
    background-image:url(./img/invoice_2@2x.png);
}
.bulletin>.supports>.supports-item>.special{
    background-image:url(./img/special_2@2x.png);
}
.bulletin>.supports>.supports-item>.text{
    font-size: 24px;
    font-weight: 200;
    line-height: 32px;
    color: rgb(7, 17, 27);
}
.pics{
    padding: 18px;
}
.pics>.title{
    margin-bottom: 16px;
    line-height: 28px;
    color: rgb(7, 17, 27);
    font-size: 28px;
}
.pics>.pic-wrapper{
    width: 100%;
    overflow: auto;
    white-space: nowrap;
}
.pics>.pic-wrapper>.pic-list{
    font-size: 0;
}
.pics>.pic-wrapper>.pic-list>.pic-item{
    display: inline-block;
    margin-right: 12px;
    width: 240px;
    height: 180px;
}
.pics>.pic-wrapper>.pic-list>.pic-item:last-child{
    margin: 0;
}
.message{
    padding: 36px;
}
.message>.title{
    margin-bottom: 16px;
    line-height: 28px;
    color: rgb(7, 17, 27);
    font-size: 28px;
}
.message>ul>.mes-item{
    padding: 32px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.message>ul>.mes-item:first-child{
    border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.message>ul>.mes-item>.text{
    padding: 0 24px;
    font-size: 24px;
    font-weight: 200;
    line-height: 32px;
    color: rgb(7, 17, 27);
}
</style>
