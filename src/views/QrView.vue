<script>
export default{
}
</script>

<template>
  <div id="app">
    <form>
      <img src="../assets/submitted.png"/>
      <h2>Please present this QR code to the concierge.</h2>
      <vue-qrcode class="qr" :value="$route.params.qr" :options="{ width: 250 }"/>
    </form>
  </div>
</template>

<style scoped>
.qr{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  height: 10%;
  max-width: 10%;
}

h2{
  color: black;
  font-weight: bold;
  font-family: "Poppins";
}
</style>
