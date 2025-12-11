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
  <!-- major.minor.patch-datetime -->
  <p class="footer">2.5.0-patch121120251629</p>
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