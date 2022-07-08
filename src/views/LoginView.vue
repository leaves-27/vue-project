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
      const onFinish = (values: any) => {
        console.log('Success:', values);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:7001/api/user/login',
          data: {
            userName: values.username,
            password: values.password
          }
        }).then(function (response) {
          const { data } = response;
          const { data: token } = data;
          localStorage.setItem("token", token);
        }).catch(function(){
          message.info("登录失败，请重新登录")
        });
      };

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