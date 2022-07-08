<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import axios from 'axios';
  export default defineComponent({
    setup() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:7001/api/auth/get_user',
      });
    }
  })
</script>
