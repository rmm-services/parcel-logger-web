<script>
import { RouterLink, RouterView } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

export default {
    name: 'App',
    components: {
      DashboardView
    }
  };

</script>

<template>
  <div id="app">
    <RouterView/>
  </div>
  <p class="footer">1.0.0.9-patch0221202240118</p>
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