<template>
      <transition name="modal-fade">
        <div class="modal-backdrop">

      <div class="modal" role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">

        <header class="modal-header" id="modalTitle">
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>
  
        <section class="modal-body" id="modalDescription">
            <tr>
            <td>Parcel Id: </td> <td class="detailvalue"> {{ parcelId }} </td>
          </tr>
          <tr>
            <td>Owners Name: </td> <td class="detailvalue"> {{ ownerName }} </td>
          </tr>
          <tr>
            <td>Unit Number: </td> <td class="detailvalue"> {{ unitNum }} </td>
          </tr>
          <tr>
            <td>Description of Items: </td> <td class="detailvalue"> {{ descItem }} </td>
          </tr>
          <tr>
            <td>Mobile Number: </td> <td class="detailvalue"> {{ mobileNum }} </td>
          </tr>
         </section>
  
        <footer class="modal-footer">
          <!-- <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close Modal
          </button> -->
        </footer>
      </div>
    </div>
      </transition>
  </template>

<script setup>
defineProps({
parcelId: String,
ownerName: String,
unitNum: String,
descItem: String,
mobileNum: String,
});
</script>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
  .modal-backdrop {
    display: flex; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    background-color: #fefefe;
  margin: auto;
  padding: 20px;
  width: 100%;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

  .modal-body td{
    width: 12rem;
    font-family: "Poppins";
  }

  .detailValue{
    text-align: right;
  }

</style>