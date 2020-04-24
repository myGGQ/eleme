<!--
 * @Author: your name
 * @Date: 2020-03-16 08:05:11
 * @LastEditTime: 2020-04-22 15:35:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\components\star\star.vue
 -->
 <template>
   <div class="star">
       <Rate disabled allow-half v-model="com" />
   </div>
 </template>
 
 <script>
 export default {
     data() {
         return {
             com: 4
         }
     }
     
 }
 </script>
 
 <style scoped>
 .star{
     width: 100%;
 }
 .star>.ivu-rate{
     font-size: 50px;
 }
 </style>
