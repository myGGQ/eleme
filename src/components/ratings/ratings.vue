<!--
 * @Author: your name
 * @Date: 2019-12-15 21:04:07
 * @LastEditTime: 2020-04-23 15:50:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\ratings\ratings.vue
 -->
<template>
<div class="ratings" ref="ratings">
    <div class="ratings-content">
        <div class="overview">
            <div class="overview-left">
                <div class="score">{{seller.score}}</div>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
                <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <Rate disabled allow-half v-model="serve" />
                    <span class="score">{{seller.serviceScore}}</span>
                </div>
                <div class="score-wrapper">
                    <span class="title">商品评分</span>
                    <Rate disabled allow-half v-model="com" />
                    <span class="score">{{seller.foodScore}}</span>
                </div>
                <div class="delivery-warpper">
                    <span class="title">送达时间</span>
                    <span class="delivery">{{seller.deliveryTime}}分钟</span>  
                </div>
            </div>  
        </div>
        <split></split>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" v-on:ratingtypeSelect="select" v-on:contenttoggle="contenttoggles"></ratingselect>
    <div class="rating-wrapper">
        <ul>
            <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
                <div class="avatar">
                    <img :src="rating.avatar" alt="" width="56px" height="56px">
                </div>
                <div class="content">
                    <h1 class="username">{{rating.username}}</h1>
                    <div class="star-wrapper">
                        <Rate disabled allow-half v-model="rating.score" />
                        <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                    </div>
                    <p class="text">{{rating.text}}</p>
                    <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                        <i :class="{'iconfont icon-zan': rating.rateType===0,'iconfont icon-cai': rating.rateType===1}"></i>
                        <span v-for="item in rating.recommend" class="rec-item">{{item}}</span>
                    </div>
                    <div class="time">
                        {{rating.rateTime | formatDate}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import {formatDate} from '../../common/js/date.js'

const ALL = 2
const ERR_OK = 0

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            serve: 4,
            com: 4.5,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            }
        }
    },
    created() {
        var self = this;
        self.$axios.get('/api/ratings').then((res) => {
            if(res.data.errno == ERR_OK){
                self.ratings = res.data.data;
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratings,{
                        click: true
                    });
                });
            }
        })
    },
    methods: {
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
        split,
        ratingselect
    }
}
</script>
<style scoped>
.ratings{
    position: absolute;
    left: 0;
    top: 356px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
}
.ratings>.ratings-content>.overview{
    display: flex;
    padding: 36px 0;
}
.ratings>.ratings-content>.overview>.overview-left{
    flex: 0 0 240px;
    width: 240px;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
    text-align: center;
}
.ratings>.ratings-content>.overview>.overview-left>.score{
    line-height: 56x;
    font-size: 48px;
    color: rgb(255, 253, 0);
    margin-bottom: 12px;
}
.ratings>.ratings-content>.overview>.overview-left>.title{
    line-height: 24px;
    font-size: 24px;
    color: rgb(7, 17, 27);
    margin-bottom: 16px;
}
.ratings>.ratings-content>.overview>.overview-left>.rank{
    line-height: 20px;
    font-size: 20px;
    color: rgb(147, 153, 159);
    margin-bottom: 12px;
}
.ratings>.ratings-content>.overview>.overview-right{
    flex: 1;
    padding-left: 40px;
}
.ratings>.ratings-content>.overview>.overview-right>.score-wrapper{
    margin-bottom: 11px;
}
.ratings>.ratings-content>.overview>.overview-right>.score-wrapper>.title{
    font-size: 24px;
    line-height: 36px;
    color: rgb(7, 17, 27);
    padding-right: 10px;
}
.ratings>.ratings-content>.overview>.overview-right>.score-wrapper>.ivu-rate{
    font-size: 30px;
    margin-top: -7px;
}
.ratings>.ratings-content>.overview>.overview-right>.score-wrapper>.score{
    font-size: 24px;
    line-height: 36px;
    color: rgb(147, 153, 159);
}
.ratings>.ratings-content>.overview>.overview-right>.delivery-warpper{}
.ratings>.ratings-content>.overview>.overview-right>.delivery-warpper>.title{
    font-size: 24px;
    line-height: 36px;
    color: rgb(7, 17, 27);
    padding-right: 10px;
}
.ratings>.ratings-content>.overview>.overview-right>.delivery-warpper>.delivery{
    font-size: 24px;
    line-height: 36px;
    color: rgb(147, 153, 159);
}
.rating-wrapper{
    padding: 0 36px;
}
.rating-wrapper>ul>.rating-item{
    display: flex;
    padding: 36px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.rating-wrapper>ul>.rating-item>.avatar{
    flex: 0 0 56px;
    width: 28px;
    margin-right: 24px;
}
.rating-wrapper>ul>.rating-item>.avatar>img{
    border-radius: 50%;
}
.rating-wrapper>ul>.rating-item>.content{
    position: relative;
    flex: 1;
}
.rating-wrapper>ul>.rating-item>.content>.username{
    font-size: 20px;
    line-height: 24px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
}
.rating-wrapper>ul>.rating-item>.content>.star-wrapper{
    margin-bottom: 12px;
    font-size: 0;
}
.rating-wrapper>ul>.rating-item>.content>.star-wrapper>.ivu-rate{
    display: inline-block;
    vertical-align: top;
    margin-right: 12px;
    line-height: 24px;
}
.rating-wrapper>ul>.rating-item>.content>.star-wrapper>.delivery{
    display: inline-block;
    vertical-align: top;
    font-size: 20px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(147, 153, 159);

}
.rating-wrapper>ul>.rating-item>.content>.text{
    font-size: 24px;
    line-height: 36px;
    color: rgb(7, 17, 27);
    margin-bottom: 16px;
}
.rating-wrapper>ul>.rating-item>.content>.recommend{
    line-height: 32px;
}
.rating-wrapper>ul>.rating-item>.content>.recommend>.iconfont{
    display: inline-block;
    margin: 0 16px 8px 0;
    font-size: 24px;
    line-height: 32px;
}
.rating-wrapper>ul>.rating-item>.content>.recommend>.icon-zan{
    color: rgb(0, 160, 220);
}
.rating-wrapper>ul>.rating-item>.content>.recommend>.icon-cai{
    color: rgb(183, 187, 191);
}
.rating-wrapper>ul>.rating-item>.content>.recommend>.rec-item{
    padding: 5px 12px;
    line-height: 32px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    background-color: rgb(255, 255, 255);
    margin-right: 16px;
}
.rating-wrapper>ul>.rating-item>.content>.time{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(147, 153, 159);
}
</style>
