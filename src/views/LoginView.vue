<template>
  <div class="login">
    <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      maxlength="8"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  import { store } from '../store';
  import router from '../router'

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }

  export default defineComponent({
    setup() {
      const formState = reactive<FormState>({
        username: '',
        password: '',
        remember: true,
      });
      
      const onFinish = ((values: any) => {
        console.log('Success:', values);
        axios({
          method: 'get',
          url: 'http://127.0.0.1:7001/api/user/login',
          params: {
            userName: values.username,
            password: values.password
          }
        }).then(function (result) {
          const { data: token } = result;
          if(token){
            store.updateToken(token);
            message.info({
              content: "登录成功",
              duration: 2,
              onClose: ()=>{
                router.push("/about");
              }
            });
          } else {
            message.info("用户名或密码不存在，请重新登录");
          }
        }).catch(function(error) {
          const { message: msg } = error;
          message.info(msg);
        });
      });

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      return {
        formState,
        onFinish,
        onFinishFailed,
      };
    },
  });
</script>