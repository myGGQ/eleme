<!--
 * @Author: your name
 * @Date: 2020-04-20 21:11:56
 * @LastEditTime: 2020-04-22 23:29:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\food\food.vue
 -->
<template>
<div class="food" v-show="showFlag" ref="food">
    <div class="food-content">
        <div class="image-header">
            <img :src="food.image"  alt="">
            <div class="back" @click="hide">
                <i class="iconfont icon-fanhui"></i>
            </div>
        </div>
        <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detaill">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="shopcart">
                <cartcontrol :food="food"></cartcontrol>
            </div>
        </div>
        <split></split>
        <div class="info">
            <h1 class="title">商品介绍</h1>
            <p class="text" v-show="food.info">{{food.info}}</p>
            <p class="text" v-show="!food.info">暂无商品介绍</p>
        </div>
        <split></split>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingtypeSelect="select" v-on:contenttoggle="contenttoggles"></ratingselect>
            <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <img class="avatar" :src="rating.avatar" alt="" width="24px" height="24px">
                        </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                        <p class="text">
                            <i :class="{'iconfont icon-zan': rating.rateType===0,'iconfont icon-cai': rating.rateType===1}"></i>
                            {{rating.text}}
                        </p>
                    </li>
                </ul>
                <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date.js'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
        show() {
            this.selectType = ALL;
            this.showFlag = true;
            this.onlyContent = false;
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.food,{
                        click: true
                    });
                }else{
                    this.scroll.refresh();
                }
            })
        },
        hide() {
            this.showFlag = false;
        },
        needShow(type,text){
            if(this.onlyContent && !text){
                return false;
            }
            if(this.selectType === ALL){
                return true;
            }else{
                return type === this.selectType;
            }
        },
        select(type) {
            this.selectType = type;
        },
        contenttoggles(onlyContent) {
           this.onlyContent = onlyContent;
        }
    },
    filters: {
        //时间戳转换
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    }
}
</script>

<style scoped>
.food{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 116px;
    z-index: 30;
    width: 100%;
    height: 100%;
    background: #fff;   
}
.food>.food-content>.image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

}
.food>.food-content>.image-header>img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.food>.food-content>.image-header>.back{
    position: absolute;
    top: 120px;
    left: 0;
}
.food>.food-content>.image-header>.back>.icon-fanhui{
    display: block;
    padding: 20px;
    font-size: 40px;
    color: #fff;
}
.food>.food-content>.content{
    padding: 36px;
    position: relative;
}
.food>.food-content>.content>.title{
    line-height: 28px;
    margin-bottom: 16px;
    font-size: 28px;
    font-weight: 700;
    color: rgb(7, 17, 27);
}
.food>.food-content>.content>.detaill{
    margin-bottom: 36px;
    height: 20px ;
}
.food>.food-content>.content>.detaill>.sell-count{
    font-size: 20px;
    line-height: 20px;
    color: rgb(147, 153, 159);
    margin-right: 24px;
}
.food>.food-content>.content>.detaill>.rating{
    font-size: 20px;
    line-height: 20px;
    color: rgb(147, 153, 159);
}
.food>.food-content>.content>.price>.now{
    font-size: 28px;
    font-weight: 700;
    line-height: 48px;
    color: rgb(240, 20, 20);
    padding-right: 10px;
}
.food>.food-content>.content>.price>.old{
    font-size: 20px;
    font-weight: normal;
    color: rgb(147, 153, 159);
    line-height: 48px;
    text-decoration:line-through;
}
.food>.food-content>.content>.shopcart{
    position: absolute;
    right: 36px;
    bottom: 36px;
}
.food>.food-content>.info{
    padding: 36px;
}
.food>.food-content>.info>.title{
    font-size: 28px;
    line-height: 28px;
    font-weight: 700;
}
.food>.food-content>.info>.text{
    font-size: 24px;
    font-weight: 200;
    color: rgb(77, 85, 93);
    line-height: 40px;
}
.rating{
    padding-top: 36px;
}
.rating>.title{
    line-height: 28px;
    font-size: 28px;
    font-weight: 700;
    margin-left: 36px;
}
.rating>.rating-wrapper{
    padding: 0 36px;
}
.rating>.rating-wrapper>ul>.rating-item{
    position: relative;
    padding: 32px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.rating>.rating-wrapper>ul>.rating-item>.user{
    position: absolute;
    right: 0;
    top: 32px;
    line-height: 24px;
    font-size: 0;
}
.rating>.rating-wrapper>ul>.rating-item>.user>.name{
    display: inline-block;
    margin-right: 12px;
    vertical-align: top;
    font-size: 20px;
    color: rgb(147, 153, 159);
}
.rating>.rating-wrapper>ul>.rating-item>.user>.avatar{
    border-radius: 50%;
}
.rating>.rating-wrapper>ul>.rating-item>.time{
    margin-bottom: 12px;
    font-size: 20px;
    line-height: 24px;
    color: rgb(147, 153, 159);
}
.rating>.rating-wrapper>ul>.rating-item>.text{  
    font-size: 24px;
    line-height: 32px;
    color: rgb(7, 17, 27);
}
.rating>.rating-wrapper>ul>.rating-item>.text>.iconfont{
    font-size: 24px;
    line-height: 48px;
}
.rating>.rating-wrapper>ul>.rating-item>.text>.icon-zan{
    color: rgb(0, 160, 220);
}
.rating>.rating-wrapper>ul>.rating-item>.text>.icon-cai{
    color: rgb(147, 153, 159);
}
.rating>.rating-wrapper>.no-rating{
    padding: 20px 0;
    font-size: 24px;
}
</style>