<!--
 * @Author: your name
 * @Date: 2019-12-14 14:18:27
 * @LastEditTime: 2020-04-22 15:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\header\header.vue
 -->
<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 商家头像 -->
      <div class="avatar">
            <img class="img" style="border-radius:4px" width="128px" heigth="128px" :src="seller.avatar" alt="头像">
      </div>
      <!-- 商家头部信息 -->
      <div class="content">
        <div class="content-title">
          <span class="barnd"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="content-time">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="content-discounts">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count" @click="showDetail()">{{seller.supports.length}}个</span>
        <i class="iconfont icon-forword support-icon"></i>
      </div>
    </div>
    <!-- 公告段落 -->
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-forword bullentin-icon"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!-- 商家详细信息 -->
    <div v-show="isShow" class="detail">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content-text">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close">
        <i class="iconfont icon-X" @click="showClean()"></i>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import star from "../star/star.vue";

export default{
  props: {
    seller: {
      type: Object,
      num: 1
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    // 商家详情页面
    showDetail() {
      this.isShow=true
    },
    showClean() {
      this.isShow=false
    }
  },
  //处于loading结束后，还做一些初始化，实现函数自执行
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
};
</script>
<style scoped> 
@import './header.css';
@import '../../common/clearfix/clearfix.css';
</style>
