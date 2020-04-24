/*
 * @Author: your name
 * @Date: 2019-12-13 14:44:37
 * @LastEditTime: 2019-12-16 18:14:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'
import seller from '@/components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
