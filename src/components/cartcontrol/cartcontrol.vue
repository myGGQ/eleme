<!--
 * @Author: your name
 * @Date: 2020-04-13 22:55:59
 * @LastEditTime: 2020-04-20 23:14:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\cartcontrol\cartcontrol.vue
 -->
<template>
  <div class="cartcontrol">
      <div class="cart-del iconfont icon-jianhao" v-show="food.count>0" @click.stop="delCart"></div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add iconfont icon-jiahao1" @click.stop="addCrat()"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {
    },
    methods: {
        //添加商品
        addCrat() {
            if(!this.food.count){
                Vue.set(this.food,'count',1);
            }else{
                this.food.count++;
            }
        },
        delCart() {
            if(this.food.count){
                this.food.count--;
            }
        }
    }
}
</script>

<style scoped>
.cartcontrol{
    font-size: 0;
}
.cartcontrol>.cart-del,.cart-add{
    display: inline-block;
    line-height: 48px;
    font-size: 40px;
    padding: 12px;
    color: rgb(0, 160, 220);
}
.cartcontrol>.cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12;
    padding-top: 12px;
    line-height: 48px;
    text-align: center;
    font-size: 20px;
    color: rgb(147, 153, 159);
}
.cartcontrol>.cart-add{
    display: inline-block;
    
}
</style>>

</style>