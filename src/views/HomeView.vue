<script>
import axios from 'axios';
import QrView from '../views/QrView.vue'
import Modal from '../components/ModalView.vue'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            goals: [],
            enteredFirstName: '',
            enteredLastName: '',
            enteredCourier: '',
            enteredRecipientName: '',
            enteredUnitNumber: '',
            enteredDescItem: '',
            enteredContactNum: '',
            ridersFirstname: '',
            ridersLastName: '',
            firstNameValidity: 'pending',
            lastNameValidity: 'pending',
            recipientNameValidity: 'pending',
            contactNumberValidity: 'pending',
            isHidden: false,
            currentTime: new Date(),
            epoch: '',
            dataResponse: [],
            qr_data: '',
            qr_id: '',
            isModalVisible: false,
            propsParcelId: '',
            propsParcelOwnerName: '',
            propsParcelUnitNumber: '',
            propsParcelItemDescription: '',
            propsParcelMobileNumber: '',
            fullPage: true,
            isLoading: true
        };
    },
    mounted() {
      setInterval(() => {
      this.formattedDateTime();
    }, 1000);
  },
    methods: {
        addGoal(e) {
            if (this.enteredFirstName.length === 0 || this.enteredLastName.length === 0 || this.enteredCourier.length === 0 ||
            this.enteredRecipientName.length === 0 || this.enteredUnitNumber.length === 0 || this.enteredDescItem.length === 0 || this.enteredContactNum.length === 0){
              

            }else{
              if(this.firstNameValidity === 'invalid' || this.lastNameValidity === 'invalid' || this.recipientNameValidity === 'invalid' || this.contactNumberValidity === 'invalid'){
                e.preventDefault();
                this.$swal({
                        icon: 'error',
                        text: "Please correct all the invalid information"
                    });
              }else{
                if (this.goals.length !== 0){
                  if (this.enteredFirstName !== this.ridersFirstname || this.enteredLastName !== this.ridersLastName){
                    e.preventDefault()
                    this.$swal({
                        icon: 'error',
                        text: "Rider's Name is not match to your previous parcel"
                    });
                }else{
                  const newitem = {
                parcel_id: this.enteredUnitNumber + this.epoch,
                riders_name: this.enteredFirstName.replace(/\s/g, "").toLocaleUpperCase() + this.enteredLastName.replace(/\s/g, "").toLocaleUpperCase(),
                riders_courier_type: this.enteredCourier,
                recipients_description_of_items: this.enteredDescItem,
                recipients_unit_number: this.enteredUnitNumber,
                recipients_name: this.enteredRecipientName,
                recipients_mobile_no: this.enteredContactNum,
                parcel_owner_datetime_received: '',
                concierge_employee_id: '',
                concierge_name: '',
                concierge_datetime_received: '',
                parcel_status: 'PENDING',
                datetimestamp: this.datetimestamp
            };
            this.goals.push(newitem);
            this.enteredUnitNumber = '';
            this.enteredRecipientName = '';
            this.enteredContactNum = '';
            this.enteredDescItem = '';
            this.ridersFirstname = this.enteredFirstName;
            this.ridersLastName = this.enteredLastName
            this.epoch = "";
            if (this.goals.length === 0) {
                this.isHidden = false;
            }
            else {
                this.isHidden = true;
            }
                }
              }else{
                const newitem = {
                parcel_id: this.enteredUnitNumber + this.epoch,
                riders_name: this.enteredFirstName.replace(/\s/g, "").toLocaleUpperCase() + this.enteredLastName.replace(/\s/g, "").toLocaleUpperCase(),
                riders_courier_type: this.enteredCourier,
                recipients_description_of_items: this.enteredDescItem,
                recipients_unit_number: this.enteredUnitNumber,
                recipients_name: this.enteredRecipientName,
                recipients_mobile_no: this.enteredContactNum,
                parcel_owner_datetime_received: '',
                concierge_employee_id: '',
                concierge_name: '',
                concierge_datetime_received: '',
                parcel_status: 'PENDING',
                datetimestamp: ''
            };
            this.goals.push(newitem);
            this.enteredUnitNumber = '';
            this.enteredRecipientName = '';
            this.enteredContactNum = '';
            this.enteredDescItem = '';
            this.ridersFirstname = this.enteredFirstName;
            this.ridersLastName = this.enteredLastName
            this.epoch = "";
            if (this.goals.length === 0) {
                this.isHidden = false;
            }
            else {
                this.isHidden = true;
            }
              }
              }
            }
        },
        clearFields() {
          if (this.goals.length === 0){
            this.$swal({
                        icon: 'error',
                        text: "You don't have registered parcel"
            }) 
          }else{
            this.$swal({
            text: "Are you sure you want to delete all parcels?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              const countParcel = this.goals.length
              this.goals.splice(0, countParcel)
              this.ridersFirstname = ''
              this.ridersLastName = ''
            this.isHidden = false;

              this.$swal(
                'Deleted!',
                'Parcels has been deleted.',
                'success'
    )
  } else if (
    result.dismiss === this.$swal.DismissReason.cancel
  ) {
    
  }
})
          }
        },
        validateInputFN() {
            if (this.enteredFirstName === '' || this.enteredFirstName.length < 3) {
                this.firstNameValidity = 'invalid';
            }
            else {
                this.firstNameValidity = 'valid';
            }
        },
        validateInputLN(){
          if (this.enteredLastName === '' || this.enteredLastName.length < 2) {
                this.lastNameValidity = 'invalid';
            }
            else {
                this.lastNameValidity = 'valid';
            }
        },
        validateInputRN(){
          if (this.enteredRecipientName === '' || this.enteredRecipientName.length < 3) {
                this.recipientNameValidity = 'invalid';
            }
            else {
                this.recipientNameValidity = 'valid';
            }
        },
        validateInputCN(){
          const validationRegex = /^\d{11}$/;
          if (!this.enteredContactNum.match(validationRegex) || !this.enteredContactNum.startsWith('09', 0)) {
                this.contactNumberValidity = 'invalid';
            }
            else {
                this.contactNumberValidity = 'valid';
            }
        },
        submit() {
          
          if (this.goals.length === 0){
            this.$swal({
                        icon: 'error',
                        text: "You don't have registered parcel"
            }) 
          }else{
            let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    loader: 'dots'
                });
            const apiData = {
                rider_details: this.goals
            };
            axios.post('https://parcel-logger-api-5d122d124b61.herokuapp.com/v1/api/add/bulk/parcel', apiData)
                .then(response => {
                    const dataRes = [{
                        data: response.data,
                        status: response.status
                    }];
                this.dataResponse = response.data;
                if (this.dataResponse.status === 'SUCCESS'){
                const qrvalue = this.dataResponse.data.map((data) => {
                    return data.rider_qr_details;
                });
                this.qr_id = qrvalue;
                loader.hide()
                this.$router.push(`/qr/${this.qr_id[0]}`);
                this.clearFields
                  }else{
                    loader.hide()
                    this.$swal({
                        icon: 'error',
                        text: "Something went wrong, Please try again!"
                    });
                  }
            })
                .catch(error => {
                  loader.hide()
                  this.$swal({
                        icon: 'error',
                        text: "Something went wrong, Please try again!"
                    });
            });
          }
        },
        deleteParcels(id) {
          this.$swal({
            text: "Are you sure you want to delete the parcel?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              const updateParcelList = this.goals.filter((el) => el.parcel_id !== id);
          this.goals = updateParcelList;

          if (this.goals.length === 0) {
                this.isHidden = false;
            }
            else {
                this.isHidden = true;
            }

              this.$swal(
                'Deleted!',
                'Parcel has been deleted.',
                'success'
    )
  } else if (
    result.dismiss === this.$swal.DismissReason.cancel
  ) {
    
  }
})
        },
        selectedParcels(id) {
          const selectedParcelsDetails = this.goals.find((el) => el.parcel_id === id);
          this.propsParcelId = selectedParcelsDetails.parcel_id;
          this.propsParcelOwnerName = selectedParcelsDetails.recipients_name;
          this.propsParcelUnitNumber = selectedParcelsDetails.recipients_unit_number;
          this.propsParcelItemDescription = selectedParcelsDetails.recipients_description_of_items;
          this.propsParcelMobileNumber = selectedParcelsDetails.recipients_mobile_no;
        },
        showModal(id) {
        this.isModalVisible = true;
        this.selectedParcels(id)
        },
      closeModal() {
        this.isModalVisible = false;
      },
      formattedDateTime() {
        const today = new Date();
        this.epoch = String(today / 1000).substring(0, 10);
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
      <h2>SENDER</h2>
      <hr>
      <div class="form-control">

        <div class="input-field" :class="{invalid: firstNameValidity === 'invalid'}">  
          <input name="rider-first-name" id="rider-first-name" type="text" required v-model.trim="enteredFirstName" @blur="validateInputFN"/>
          <label for="rider-first-name">Rider's First Name</label>
          <p v-if="firstNameValidity === 'invalid'">Please enter a valid name!</p>
        </div>

        <div class="input-field" :class="{invalid: lastNameValidity === 'invalid'}">  
          <input name="rider-last-name" id="rider-last-name" type="text" required v-model.trim="enteredLastName" @blur="validateInputLN" />
          <label for="rider-last-name">Rider's Last Name</label>
          <p v-if="lastNameValidity === 'invalid'">Please enter a valid name!</p>
        </div>

        <div class="input-field">  
          <input name="rider-courier" id="rider-courier" type="text" required v-model.trim="enteredCourier" @blur="validateInput" />
          <label for="rider-courier">Courier</label>
        </div>

      <h2>RECIPIENT</h2>
      <hr>

        <div class="input-field" :class="{invalid: recipientNameValidity === 'invalid'}">  
          <input name="recipient-name" id="recipient-name" type="text" required v-model.trim="enteredRecipientName" @blur="validateInputRN" />
          <label for="recipient-name">Name</label>
          <p v-if="recipientNameValidity === 'invalid'">Please enter a valid name!</p>
        </div>

        <div class="input-field">  
          <input name="unit-number" id="unit-number" type="text" required v-model.trim="enteredUnitNumber" @blur="validateInput" />
          <label for="unit-number">Unit Number</label>
        </div>

        <div class="input-field">  
          <input name="description-item" id="description-item" type="text" required v-model.trim="enteredDescItem" @blur="validateInput" />
          <label for="description-item">Description Of Items</label>
        </div>

        <div class="input-field" :class="{invalid: contactNumberValidity === 'invalid'}">  
          <input name="contact-number" id="contact-number" type="text" required v-model.trim="enteredContactNum" @blur="validateInputCN" />
          <label for="contact-number">Contact Number</label>
          <p v-if="contactNumberValidity === 'invalid'">Please enter a valid number!</p>
        </div>

        <div>
          <button class="buttonAdd" @click="addGoal">Add Parcel</button>
        </div>

      </div>
    </form>
    <div>

      <div>
          <button class="buttonClear" @click="clearFields">Clear All</button>
        </div>

        <div v-if=isHidden>
          <table id="parcels" >
            <tr>
            <th>Unit Number</th>
            <th>Recipient Name</th>
            <th>Contact Number</th>
            <th></th>
            </tr>
            <tr id="items" v-for="goal in goals" :key="goal.parcel_id">
            <td @click="showModal(goal.parcel_id)">{{ goal.recipients_unit_number }}</td>
            <td @click="showModal(goal.parcel_id)">{{ goal.recipients_name }}</td>
            <td @click="showModal(goal.parcel_id)">{{ goal.recipients_mobile_no }}</td>
            <td @click="deleteParcels(goal.parcel_id)"><img  src="../assets/delete.png"/></td>

            <Modal
              v-show="isModalVisible"
              @close="closeModal"
              :parcelId="propsParcelId"
              :ownerName="propsParcelOwnerName"
              :unitNum="propsParcelUnitNumber"
              :descItem="propsParcelItemDescription"
              :mobileNum="propsParcelMobileNumber"/>
            </tr>
          </table>
        </div>
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

img {
  height: auto;
  max-width: 100%;
  width: 100%;
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

img {
  height: auto;
  max-width: 90%;
  padding: 1rem;
}
}

@media
 (max-width: 500px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: small;
}

img {
  height: auto;
  max-width: 100%;
}
}

@media (max-width: 450px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: small;
}

img {
  height: auto;
  max-width: 200%;
}
}

@media (max-width: 400px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: x-small;
}

img {
  height: auto;
  max-width: 150%;
}
}

@media (max-width: 350px) {
#parcels td, #parcels th {
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: xx-small;
}

img {
  height: auto;
  max-width: 150%;
}
}

/* iphone */
@media (max-width: 1400px) {
  img {
  height: auto;
  max-width: 80%;
  width: 80%;
  padding: 10px;
}
}

@media (max-width: 1300px) {
  img {
  height: auto;
  max-width: 100%;
  width: 100%;
  padding: 10px;
}
}
</style>