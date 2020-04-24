<!--
 * @Author: your name
 * @Date: 2019-12-15 19:59:27
 * @LastEditTime: 2020-04-22 22:40:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\goods\goods.vue
 -->
<template>
<div>
<div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul class="menu-ul">
            <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectIndex(index)">
                <span class="text">
                    <span v-show="goods[index].type>0" class="icon" :class="classMap[goods[index].type]"></span>
                    {{goods[index].name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="(item,index) in goods" class="food-item food-list-hook">
                <h1 class="title">{{goods[index].name}}</h1>
                <ul>
                <li v-for="(item,index) in goods[index].foods" @click="selectFood(item)" class="food-li">
                    <div class="icon">
                        <img :src="item.icon" alt="商品图片" width="128px" height="128px">
                    </div>
                    <div class="content">
                        <h2>{{item.name}}</h2>
                        <p class="desc" v-show="item.description">{{item.description}}</p>
                        <div class="extra">
                            <span>月售{{item.sellCount}}份</span>
                            <span>好评率{{item.rating}}%</span>
                        </div>
                        <div class="price">
                            <span>￥{{item.price}}</span>
                            <span v-show="item.oldPrice" class="price-old">￥{{item.oldPrice}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="item"></cartcontrol>
                        </div>
                    </div>
                </li>
            </ul>
            </li>
        </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
</div>
<food :food="selectedFood" ref="food"></food>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import food from '../food/food.vue'

const ERR_OK = 0 

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    computed: {
        currentIndex() {
            for(let i = 0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
                    return i;
                }
            }
            return 0;
        },
        //商品总价
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if(food.count){
                        foods.push(food);
                    }
                })
            })
            return foods;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

        var self =this
        self.$axios.get('/api/goods').then((res) => {
            if(res.data.errno == ERR_OK){
                self.goods = res.data.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeigth();
                });
            }
    })
    },
    methods: {
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper,{
                click : true
            });

            this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
                click : true,
                probeType: 3
            });

            this.foodScroll.on('scroll',(pos)=> {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        // 商品联动右栏
        _calculateHeigth() {
             let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
             let height = 0;
             this.listHeight.push(height);
             for(let i = 0;i<foodList.length;i++){
                 let item = foodList[i];
                 height += item.clientHeight;
                 this.listHeight.push(height);
             }
        },
        //商品联动左栏
        selectIndex(index) {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            this.foodScroll.scrollToElement(foodList[index],250);
        },
        selectFood(food) {
            this.selectedFood = food;
            this.$refs.food.show()
            // console.log(this.selectedFood)
        }
    },
    components: {
        shopcart,
        cartcontrol,
        food
    }
}
</script>
<style scoped>
@import './goods.css';
</style>
