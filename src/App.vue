<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'

export default {
    name: 'App',
    components: {
      HomeView
    }
  };

</script>

<template>
  <div id="app">
    <RouterView/>
  </div>
</template>