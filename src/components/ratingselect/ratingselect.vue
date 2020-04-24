<!--
 * @Author: your name
 * @Date: 2020-04-22 15:15:20
 * @LastEditTime: 2020-04-22 22:41:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\ratingselect\ratingselcet.vue
 -->
<template>
<div class="ratingselect">
    <div class="rating-type">
        <span v-on:click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">
            {{desc.all}}
            <span class="count">{{ratings.length}}</span>
        </span>
        <span v-on:click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">
            {{desc.positive}}
            <span class="count">{{positives.length}}</span>
        </span>
        <span v-on:click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">
            {{desc.negative}}
            <span class="count">{{negatives.length}}</span>
        </span>
    </div>
    <div  v-on:click="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
        <i class="iconfont icon-dui"></i>
        <span class="text">只看有内容的评价</span>
    </div>
</div>
</template>

<script>

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    data() {
        return {
            // selectType: this.selectType,
            // onlyContent: this.onlyContent
        }
    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            })
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            })
        }
    },
    methods: {
        select(type,event) {
            if(!event._constructed){
                return;
            }
            this.selectType = type;
            this.$emit('ratingtypeSelect',type)
        },
        toggleContent(event) {
            if(!event._constructed){
                return;
            }
            this.onlyContent = !this.onlyContent;
            this.$emit('contenttoggle',this.onlyContent)
        }
    }
}
</script>

<style scoped>
.ratingselect{}
.ratingselect>.rating-type{
    padding: 36px 0;
    margin: 0 36px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
}
.ratingselect>.rating-type>.block{
    display: inline-block;
    padding: 16px 24px;
    font-size: 24px;
    margin-right: 16px;
    border-radius: 2px;
    color: rgb(77, 85, 93);
}
.ratingselect>.rating-type>.positive{
    background-color: rgba(0, 160, 220, 0.2);
}
.ratingselect>.rating-type>.negative{
    background-color: rgba(77, 85, 93, 0.2);
}
.ratingselect>.rating-type>.active{
    color: #fff;
    background-color: rgb(0, 160, 220);
}
.ratingselect>.rating-type>.block>.count{
    font-size: 16px;
}
.ratingselect>.switch{
    padding: 24px 36px;
    line-height: 48px;
    font-size: 24px;
    color: rgb(147, 153, 159);
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.ratingselect>.switch>.icon-dui{
    display: inline-block;
    vertical-align: top;
    font-size: 35px;
    margin-right: 8px;
}
.ratingselect>.switch>.text{
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
}
.ratingselect>.on>.icon-dui{
    color: #00c850;
}
</style>