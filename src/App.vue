<!--
 * @Author: your name
 * @Date: 2019-12-13 14:44:37
 * @LastEditTime: 2020-04-23 21:18:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\App.vue
 -->

<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-items"><router-link to="/goods"><a href="#">商品</a></router-link></div>
      <div class="tab-items"><router-link to="/ratings"><a href="#">评论</a></router-link></div>
      <div class="tab-items"><router-link to="/seller"><a href="#">商家</a></router-link></div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'

const ERR_OK = 0

export default{
  data () {
    return {
      seller: {}
    }
  },
  methodes () {
  },
  created () {
    var self = this
    self.$axios.get('/api/seller').then((res) => {
      if (res.data.errno === ERR_OK) {
        self.seller = res.data.data
        }
    })
  },
  mounted () {},
  components: {
    'v-header': header
  }
}
</script>

<style>
#app>.tab{
  display:flex;
  width:640px;
  height:80px;
  line-height: 80px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
#app>.tab>.tab-items{
  flex:1;
  text-align: center;
}
#app>.tab>.tab-items>a{
  display: block;
  font-size:28px;
  color: rgb(77, 85, 93);
}
.tab>.tab-items>.router-link-exact-active>a{
    color: rgb(240, 20, 20);
}
</style>
