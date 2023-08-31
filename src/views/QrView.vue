<script>
export default{
}
</script>

<template>
  <div id="form-app">
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
  height: auto;
  width: 100%;
  max-width: 10%;
}

h2{
  color: black;
  font-weight: bold;
  font-family: "Poppins";
}

@media (max-width: 1300px) {
  img {
  height: auto;
  width: 100%;
  max-width: 10%;
}
}

@media (max-width: 500px) {
  img {
  height: auto;
  max-width: 20%;
}
}
</style>
