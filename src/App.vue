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
  <p class="footer">1.0.0.5-patch0219202240320</p>
</template>

<style scoped>
.footer {
   position: absolute;
   right:0;
   color: black;
   text-align: right;
   font-family: "Poppins";
   font-size: smaller;
}
</style>