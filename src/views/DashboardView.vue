<script>
export default {
  methods: {
    goToPickup() {
      this.$router.push('/pickup_parcel')
    },
    goToReceive() {
      this.$router.push('/receive_parcel')
    }
  }
}
</script>
<template>
    <img src="../assets/kroma-logo.png" style="width:40%;">

        <div class="btn-group">
          <button class="button button1" @click="goToReceive">Deliver Parcel</button>
          <button class="button button1" @click="goToPickup">Pickup Parcel</button>
        </div>
</template>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10%;
}

.btn-group .button {
  background-color: #7C4D38; 
  color: white; 
  border: 2px solid #7C4D38;
  border-radius: 5px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  width: 50%;
  height: 80px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-family: "Poppins";
}

.btn-group .button:hover {
  background-color: #7C4D38;
  font-family: "Poppins";
  color: white;
}
</style>