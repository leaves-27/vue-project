<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>用户名：{{ userInfo.username }}</p>
    <p>电话：{{ userInfo.phone }}</p>
    <p>邮箱：{{ userInfo.email }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: flex;
    align-items: center; */
  }
}
</style>
<script lang="ts">
  import { defineComponent, onMounted, reactive } from 'vue';
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  interface UserInfo {
    username: string;
    phone: string;
    email: string;
  }
  export default defineComponent({
    setup() {
      const userInfo = reactive<UserInfo>({
        username: '',
        phone: '',
        email: '',
      });

      return {
        userInfo,
        updateUserName(userName) {
          this.userInfo.username = userName;
        },
        updatePhone(phone) {
          this.userInfo.phone = phone;
        },
        updateEmail(email) {
          this.userInfo.email = email;
        },
      }
    },
    mounted(){
      const _self = this;
      axios({
        method: 'get',
        url: 'http://127.0.0.1:7001/api/auth/get_user',
      }).then(function(result) {
        const { success, data } = result;
        console.log('========result:', result);
        if(success){
          console.log('========_self:', _self);
          _self.updateUserName(data.username);
          _self.updatePhone(data.phone);
          _self.updateEmail(data.email);
        } else {
          message.info('获取用户信息失败，请稍后重新刷新页面');
        }
      }).catch(function(error){
        console.log("======error:", error);
        message.info('获取用户信息失败，请稍后重新刷新页面或联系客服');
      });
    }
  });
</script>
