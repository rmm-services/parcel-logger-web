<script>
import axios from 'axios';
import QrView from '../views/QrView.vue'
import Modal from '../components/ModalView.vue'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            pickupParcel: [],
            enteredOtherSender: '',
            enteredSenderName: '',
            enteredUnitNumber: '',
            enteredDescItem: '',
            entereditemQuantity: '',
            enteredOtherReceiver: '',
            enteredReceiversName: '',
            disabled: 0,
            senderNameValidity: 'pending',
            unitNumberValidity: 'pending',
            descItemValidity: 'pending',
            quantityValidity: 'pending',
            receiversNameValidity: 'pending',
            checked: false,
            isHidden: false,
            currentTime: new Date(),
            epoch: '',
            dataResponse: [],
            qr_data: '',
            qr_id: '',
            isModalVisible: false,
            fullPage: true,
            isLoading: true,
            selectedSenderType: '',
            selectedReceiver: '',
            showInputReceiver: false,
            showInputSender: false,
            sender: '',
            receiver: ''
        };
    },
    mounted() {
      setInterval(() => {
      this.formattedDateTime();
    }, 1000);
  },
    methods: {
        validateInputSN(){
          if (this.enteredSenderName === '' || this.enteredSenderName.length < 3) {
                this.senderNameValidity = 'invalid';
            }
            else {
                this.senderNameValidity = 'valid';
            }
        },
        validateInputUN(){
          if (this.enteredUnitNumber === '' || this.enteredUnitNumber.length < 3) {
                this.unitNumberValidity = 'invalid';
            }
            else {
                this.unitNumberValidity = 'valid';
            }
        },
        validateInputDI(){
          if (this.enteredDescItem === '' || this.enteredDescItem.length < 3) {
                this.descItemValidity = 'invalid';
            }
            else {
                this.descItemValidity = 'valid';
            }
        },
        validateInputIQ(){
          if (this.entereditemQuantity === '') {
                this.quantityValidity = 'invalid';
            }
            else {
                this.quantityValidity = 'valid';
            }
        },
        validateInputRCN(){
          if (this.enteredReceiversName === '' || this.enteredReceiversName.length < 3) {
                this.receiversNameValidity = 'invalid';
            }
            else {
                this.receiversNameValidity = 'valid';
            }
        },
        submit(e) {
            if (this.enteredSenderName.length === 0 || this.enteredUnitNumber.length === 0 || this.enteredDescItem.length === 0 || 
            this.entereditemQuantity.length === 0 || this.enteredReceiversName.length === 0
             ){
                e.preventDefault();
                this.$swal({
                        icon: 'error',
                        text: "Please fill out all information"
                    });
            }else{
              if(this.senderNameValidity === 'invalid' || this.unitNumberValidity === 'invalid' || this.descItemValidity === 'invalid' ||
                this.quantityValidity === 'invalid' || this.receiversNameValidity === 'invalid'){
                e.preventDefault();
                this.$swal({
                        icon: 'error',
                        text: "Please correct all the invalid information"
                    });
              }else{
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    loader: 'dots'
                });

            const data = {
                pickup_id: '',
                name_of_sender: this.enteredSenderName.toLocaleUpperCase(),
                receiver_type: this.receiverData,
                sender_type: this.senderData,
                courier_type: '',
                unit_number: this.enteredUnitNumber,
                description_of_items: this.enteredDescItem.toLocaleUpperCase(),
                quantity: this.entereditemQuantity,
                receiver_name: this.enteredReceiversName.toLocaleUpperCase(),
                employee_no: '',
                employee_name: '',
                received_by_employee_id: '',
                received_by_employee_name: '',
                signature: '',
                status: 'PENDING',
                datetime_completed: '',
                datetimestamp: ''
            };
            this.pickupParcel.push(data)
            const apiData = {
              pickup_details: this.pickupParcel
            }
            console.log(apiData)
            axios.post('https://parcel-logger-api-5d122d124b61.herokuapp.com/v1/api/pick-up/parcel/add', apiData)
                .then(response => {
                this.dataResponse = response.data;
                if (response.data.data.message === 'Success'){
                  loader.hide()
                    this.$swal({
                        icon: 'success',
                        html: `Your Pickup Id is: 
                         <label style="color: black; font-size:20px"> ${response.data.data.successfully_saved} </label>
                          <br><br>
                          Please present this to concierge or take a screenshot before closing this message`
                    }).then((result) => {
                        if(result.isConfirmed){
                          this.pickupParcel.splice(0, 1)
                          this.$router.push('/')
                        }
                    });
                  }else{
                    loader.hide()
                    this.$swal({
                        icon: 'error',
                        text: "Something went wrong, Please try again!"
                    }).then((result) => {
                        if(result.isConfirmed){
                          this.pickupParcel.splice(0, 1)
                        }
                    });
                  }
            })
                .catch(error => {
                  console.log(error)
                  loader.hide()
                  this.$swal({
                        icon: 'error',
                        text: "Something went wrong, Please try again!"
                    }).then((result) => {
                        if(result.isConfirmed){
                          this.pickupParcel.splice(0, 1)
                        }
                    });
            });
            }
        }
        },
        formattedDateTime() {
        const today = new Date();
        this.epoch = String(today / 1000).substring(0, 10);
        },
        closeBrowser(){
          var myWindow = window.open("", "_self");
                          myWindow.close();
        }
    },
    computed: {
        datetimestamp() {
            const hours = String(this.currentTime.getHours()).padStart(2, "0");
            const minutes = String(this.currentTime.getMinutes()).padStart(2, "0");
            const seconds = String(this.currentTime.getSeconds()).padStart(2, "0");
            const month = String(this.currentTime.getMonth() + 1).padStart(2, "0");
            const day = String(this.currentTime.getDate()).padStart(2, "0");
            const year = this.currentTime.getFullYear();
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        receiverData(){
          if (this.selectedReceiver === 'Other') {
              this.receiver = this.enteredOtherReceiver.toLocaleUpperCase()
          } else {
              this.receiver = this.selectedReceiver.toLocaleUpperCase()
          }
          return this.receiver;
        },
        senderData(){
          if (this.selectedSenderType === 'Other') {
              this.sender = this.enteredOtherSender.toLocaleUpperCase()
          } else {
              this.sender = this.selectedSenderType.toLocaleUpperCase()
          }
          return this.sender;
        },
        validateInputOtherReceiver(){
          if (this.selectedReceiver === 'Other'){
            this.showInputReceiver = true
            this.enteredOtherReceiver = ''
          }else {
            this.showInputReceiver = false
            this.enteredOtherReceiver = ''
          }
          return this.showInputReceiver;
        },
        validateInputOtherSender(){
          if (this.selectedSenderType === 'Other'){
            this.showInputSender = true
            this.enteredOtherSender = ''
          }else {
            this.showInputSender = false
            this.enteredOtherSender = ''
          }
          return this.showInputSender;
        }
    },
    components: {
      QrView,
      Modal,
      Swal
    }
}
</script>

<template>
  <div id="form-app">
    <form>
      <h2>Details</h2>
      <hr>
      <div class="form-control">

        <div class="input-field">  
          <select v-model.trim="selectedSenderType">
            <option disabled value="">Select Sender Type</option>
            <option>Resident</option>
            <option>Courier</option>
            <option>Broker</option>
            <option>SPA</option>
            <option>Relative</option>
            <option>Helper</option>
            <option>Other</option>
          </select>
        </div>

        <div v-if="validateInputOtherSender" class="input-field">
          <input name="other-sender" id="other-sender" type="text" required v-model.trim="enteredOtherSender"/>
          <label for="other-sender">Other Sender Type</label>
        </div>

        <div class="input-field" :class="{invalid: senderNameValidity === 'invalid'}">  
          <input name="sender-name" id="sender-name" type="text" required v-model.trim="enteredSenderName" @blur="validateInputSN"/>
          <label for="sender-name">Name of Sender/Consignor:</label>
          <p v-if="senderNameValidity === 'invalid'">Please enter a valid name!</p>
        </div>

        <div class="input-field" :class="{invalid: unitNumberValidity === 'invalid'}">  
          <input name="unit-number" id="unit-number" type="number"
          required v-model.trim="enteredUnitNumber" @blur="validateInputUN" />
          <label for="unit-number">Unit Number</label>
          <p v-if="unitNumberValidity === 'invalid'">Please enter a valid unit number!</p>
        </div>

        <div class="input-field" :class="{invalid: descItemValidity === 'invalid'}">  
          <input name="description-item" id="description-item" type="text" required v-model.trim="enteredDescItem" @blur="validateInputDI" />
          <label for="description-item">Description of Item/s:</label>
          <p v-if="descItemValidity === 'invalid'">Please enter a valid description item!</p>
        </div>

        <div class="input-field" :class="{invalid: quantityValidity === 'invalid'}">  
          <input name="item-quantity" id="item-quantity" type="number"
          required v-model.trim="entereditemQuantity" @blur="validateInputIQ" />
          <label for="item-quantity">Quantity</label>
          <p v-if="quantityValidity === 'invalid'">Please enter a valid quantity!</p>
        </div>

        <div class="input-field">  
          <select v-model.trim="selectedReceiver">
            <option disabled value="">Select Receiver Type:</option>
            <option>Resident</option>
            <option>Courier</option>
            <option>Broker</option>
            <option>SPA</option>
            <option>Relative</option>
            <option>Helper</option>
            <option>Other</option>
          </select>
        </div>

        <div v-if="validateInputOtherReceiver" class="input-field">
          <input name="other-receiver" id="other-receiver" type="text" required v-model.trim="enteredOtherReceiver"/>
          <label for="other-receiver">Other Receiver Type</label>
        </div>

        <div class="input-field" :class="{invalid: receiversNameValidity === 'invalid'}">  
          <input name="receivers-name" id="receivers-name" type="text" required v-model.trim="enteredReceiversName" @blur="validateInputRCN"/>
          <label for="receivers-name">Receivers Name</label>
          <p v-if="receiversNameValidity === 'invalid'">Please enter a valid name!</p>
        </div>

      </div>
    </form>
    <div>

          <button class="btnDone" @click="submit">Done</button>
        </div>
  </div>
</template>

<style scoped>
#parcels {
  font-family: "Poppins";
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
}

#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  color: black;
  height: 5px;
}

#parcels tr:nth-child(even){background-color: #ffffff;}

#parcels tr:hover {background-color: #ddd;}

#parcels th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #7C4D38;
  color: white;
  width: 1rem;
}

#edit{
  height: auto;
  max-width: 100%;
  width: 100%;
  padding: 10px;
}

#delete{
  height: auto;
  max-width: 120%;
  width: 120%;
  padding: 10px;
}

p{
  font-family: "Poppins";
  color: red;
}

@media (max-width: 600px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: small;
}

#edit{
  height: auto;
  max-width: 100%;
  width: 100%;
}

#delete{
  height: auto;
  max-width: 120%;
  width: 120%;
}

}

@media
 (max-width: 500px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: small;
}

#edit{
  height: auto;
  max-width: 100%;
  width: 100%;
}

#delete{
  height: auto;
  max-width: 120%;
  width: 120%;
}
}

@media (max-width: 450px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: small;
}

#edit{
  height: auto;
  max-width: 130%;
  width: 130%;
}

#delete{
  height: auto;
  max-width: 150%;
  width: 150%;
}
}

@media (max-width: 400px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: x-small;
}

#edit{
  height: auto;
  max-width: 150%;
  width: 150%;
}

#delete{
  height: auto;
  max-width: 170%;
  width: 170%;
}
}

@media (max-width: 350px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: xx-small;
}

#edit{
  height: auto;
  max-width: 120%;
  width: 120%;
}

#delete{
  height: auto;
  max-width: 140%;
  width: 140%;
}
}

/* iphone */
@media (min-width: 1400px) {
  #edit{
  height: auto;
  max-width: 100%;
  width: 100%;
  padding: 10px;
}

#delete{
  height: auto;
  max-width: 120%;
  width: 120%;
  padding: 10px;
}
}

@media (min-width: 1300px) {

#edit{
  height: auto;
  max-width: 100%;
  width: 100%;
  padding: 10px;
}

#delete{
  height: auto;
  max-width: 120%;
  width: 120%;
  padding: 10px;
}
}

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-top: 12px;
  cursor: pointer;
  font-size: 15px;
  color: black;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #ccc;
  border-radius: 5px;
}

.container input:checked ~ .checkmark {
  background-color: #7C4D38;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>