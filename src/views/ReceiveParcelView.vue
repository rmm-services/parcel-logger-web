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
            editRecipientName: '',
            enteredUnitNumber: '',
            enteredDescItem: '',
            enteredContactNum: '',
            ridersFirstname: '',
            ridersLastName: '',
            disabled: 0,
            firstNameValidity: 'pending',
            lastNameValidity: 'pending',
            recipientNameValidity: 'pending',
            unitNumberValidity: 'pending',
            descItemValidity: 'pending',
            contactNumberValidity: 'pending',
            checked: false,
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
        addParcel(e) {
            if (this.enteredFirstName.length === 0 || this.enteredLastName.length === 0 || this.enteredCourier.length === 0 ||
            this.enteredRecipientName.length === 0 || this.enteredUnitNumber.length === 0 || this.enteredDescItem.length === 0 || this.enteredContactNum.length === 0){
            }else{
              if(this.firstNameValidity === 'invalid' || this.lastNameValidity === 'invalid' || this.recipientNameValidity === 'invalid' || this.unitNumberValidity === 'invalid' || this.descItemValidity === 'invalid' || this.contactNumberValidity === 'invalid'){
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
                riders_courier_type: this.enteredCourier.toLocaleUpperCase(),
                recipients_description_of_items: this.enteredDescItem.toLocaleUpperCase(),
                recipients_unit_number: this.enteredUnitNumber,
                recipients_name: this.enteredRecipientName.toLocaleUpperCase(),
                recipients_mobile_no: this.enteredContactNum,
                parcel_owner_datetime_received: '',
                concierge_employee_id: '',
                concierge_name: '',
                concierge_datetime_received: '',
                parcel_status: 'PENDING',
                datetimestamp: this.datetimestamp
            };
            this.goals.push(newitem);
            this.enteredDescItem = '';
            this.ridersFirstname = this.enteredFirstName;
            this.ridersLastName = this.enteredLastName;

            if (this.checked === false) {
              this.enteredRecipientName = '';
              this.enteredUnitNumber = '';
              this.enteredDescItem = '';
              this.enteredContactNum = '';
            }
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
                riders_courier_type: this.enteredCourier.toLocaleUpperCase(),
                recipients_description_of_items: this.enteredDescItem.toLocaleUpperCase(),
                recipients_unit_number: this.enteredUnitNumber,
                recipients_name: this.enteredRecipientName.toLocaleUpperCase(),
                recipients_mobile_no: this.enteredContactNum,
                parcel_owner_datetime_received: '',
                concierge_employee_id: '',
                concierge_name: '',
                concierge_datetime_received: '',
                parcel_status: 'PENDING',
                datetimestamp: this.datetimestamp
            };
            this.goals.push(newitem);
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
        handleCheckboxChange() {
      // This method will be called when the checkbox state changes
      console.log("Checkbox state changed. Checked:", this.checked);
      if (this.checked === false){
        this.enteredRecipientName = '';
        this.enteredUnitNumber = '';
        this.enteredDescItem = '';
        this.enteredContactNum = '';
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
          if (this.enteredLastName === '' || this.enteredLastName.length < 3) {
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
            axios.post('https://kromatower.ph/be/v1/api/add/bulk/parcel', apiData)
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
        editParcels(index, id, ownerName, unitNum, descItem, mobileNum) {
          const inputValue = id;
          this.$swal({
            html: `<section>
              <div style="text-align:left; width: max-width; padding-top: 50px">
              <label style="text-align:left; color: black; font-size:15px">Parcel Id: </label>
            </div>
            <div style="width: 100%">
              <input disabled value="` + id + `" style="width: 100%; height: 35px;border-radius: 6px;font-family: Poppins;color: #000000; text-transform: uppercase;"/>
              </div>
              
              <div style="text-align:left; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:15px">Owners Name: </label>
            </div>
            <div style="width: 100%; text-align:left;">
              <input id="edit-owner-name" value="` + ownerName +`" style="width: 100%; height: 45px;border-radius: 6px;font-family: Poppins;color: #000000; text-transform: uppercase;"/>
              <p style="display: none; text-align:left; font-size:12px; width: max-width; color: red" id="error-owner-name">Owner's name is too short!</p>
              </div>

              <div style="text-align:left; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:15px">Unit Number: </label>
            </div>
            <div style="width: 100%; text-align:left;">
              <input id="edit-unit-number" value="` + unitNum +`" style="width: 100%; height: 45px;border-radius: 6px;font-family: Poppins;color: #000000; text-transform: uppercase;"/>
              <p style="display: none; text-align:left; font-size:12px; width: max-width; color: red" id="error-unit-number">Unit number is too short!</p>
              </div>

              <div style="text-align:left; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:15px">Description of Items: </label>
            </div>
            <div style="width: 100%; text-align:left;">
              <input id="edit-description-item" value="` + descItem +`" style="width: 100%; height: 45px;border-radius: 6px;font-family: Poppins;color: #000000; text-transform: uppercase;"/>
              <p style="display: none; text-align:left; font-size:12px; width: max-width; color: red" id="error-desc-item">Description of item is too short!</p>
              </div>

              <div style="text-align:left; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:15px">Mobile Number:  </label>
            </div>
            <div style="width: 100%; text-align:left;">
              <input id="edit-mobile-number" value="` + mobileNum +`" style="width: 100%; height: 35px;border-radius: 6px;font-family: Poppins;color: #000000; text-transform: uppercase;"/>
              <p style="display: none; text-align:left; font-size:12px; width: max-width; color: red" id="error-mobile-num">Mobile number is too short!</p>
              <p style="display: none; text-align:left; font-size:12px; width: max-width; color: red" id="error-mobile-num-valid">Please enter a valid mobile number!</p>
              </div>
              </section>`,          
            showCloseButton: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#7C4D38',
            cancelButtonColor: '#7C4D38',
            confirmButtonText: 'Update',
            preConfirm: async (id) => {

              const inputOwnerName = document.getElementById("edit-owner-name");
              const inputOwnerNameValue = inputOwnerName.value;
              const errorOwnerName = document.getElementById("error-owner-name");

              const inputUnitNumber = document.getElementById("edit-unit-number");
              const inputUnitNumberValue = inputUnitNumber.value;
              const errorUnitNumber = document.getElementById("error-unit-number");

              const inputDescriptionItem = document.getElementById("edit-description-item");
              const inputDescriptionItemValue = inputDescriptionItem.value;
              const errorDescItem = document.getElementById("error-desc-item");

              const inputMobileNumber = document.getElementById("edit-mobile-number");
              const inputMobileNumberValue = inputMobileNumber.value;
              const validationRegex = /^\d{11}$/;
              const errorMobileNum = document.getElementById("error-mobile-num");
              const errorMobileNumValid = document.getElementById("error-mobile-num-valid");

          if (inputOwnerNameValue === '' || inputOwnerNameValue.length < 3){
            errorOwnerName.style.display = 'inline';
          }else{
            errorOwnerName.style.display = 'none';
          }

          if (inputUnitNumberValue === '' || inputUnitNumberValue.length < 3){
            errorUnitNumber.style.display = 'inline';
          }else{
            errorUnitNumber.style.display = 'none';
          }

          if (inputDescriptionItemValue === '' || inputDescriptionItemValue.length < 3){
            errorDescItem.style.display = 'inline';
          }else{
            errorDescItem.style.display = 'none';
          }

          if (inputMobileNumberValue === '' || inputMobileNumberValue.length < 11){
            errorMobileNum.style.display = 'inline';
            errorMobileNumValid.style.display = 'none'
          }else if (!inputMobileNumberValue.match(validationRegex) || !inputMobileNumberValue.startsWith('09', 0)){
            errorMobileNum.style.display = 'none';
            errorMobileNumValid.style.display = 'inline'
          }else{
            errorMobileNum.style.display = 'none';
            errorMobileNumValid.style.display = 'none';
          }

          if (errorOwnerName.style.display === 'none' && errorUnitNumber.style.display === 'none' && errorDescItem.style.display === 'none' && errorMobileNum.style.display === 'none' && errorMobileNumValid.style.display === 'none'){
            return true
          }else{
            return false
          }
        }
          }).then((result) => {
            if (result.isConfirmed) {
        
          const selectedParcelsDetails = this.goals.find((el) => el.parcel_id === id);
          const propsParcelId = selectedParcelsDetails.parcel_id

          const inputOwnerName = document.getElementById("edit-owner-name");
          const inputOwnerNameValue = inputOwnerName.value;

          const inputUnitNumber = document.getElementById("edit-unit-number");
          const inputUnitNumberValue = inputUnitNumber.value;

          const inputDescriptionItem = document.getElementById("edit-description-item");
          const inputDescriptionItemValue = inputDescriptionItem.value;

          const inputMobileNumber = document.getElementById("edit-mobile-number");
          const inputMobileNumberValue = inputMobileNumber.value;
          
          if (propsParcelId === id){
            const newitem = {
                parcel_id: id,
                riders_name: selectedParcelsDetails.riders_name,
                riders_courier_type: selectedParcelsDetails.riders_courier_type,
                recipients_description_of_items: inputDescriptionItemValue,
                recipients_unit_number: inputUnitNumberValue,
                recipients_name: inputOwnerNameValue,
                recipients_mobile_no: inputMobileNumberValue,
                parcel_owner_datetime_received: '',
                concierge_employee_id: '',
                concierge_name: '',
                concierge_datetime_received: '',
                parcel_status: 'PENDING',
                datetimestamp: selectedParcelsDetails.datetimestamp
            };
          
            this.goals.splice(index, 1, newitem)
          }

          if (this.goals.length === 0) {
                this.isHidden = false;
            }
            else {
                this.isHidden = true;
            }

              this.$swal(
                'Updated!',
                'Parcel has been Updated.',
                'success'
    )
  } else if (
    result.dismiss === this.$swal.DismissReason.cancel
  ) {
    
  }
})
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
        showParcels(id, ownerName, unitNum, descItem, mobileNum) {
          this.$swal({
            html: `<section>
              <div style="text-align:center; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:18px">Parcel Id:  </label>
              <label style="text-align:left; color: black; font-size:18px">` + id + `</label>
              </div>

              <div style="text-align:center; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:18px">Owners Name:  </label>
              <label style="text-align:left; color: black; font-size:18px">` + ownerName + `</label>
              </div>

              <div style="text-align:center; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:18px">Unit Number:  </label>
              <label style="text-align:left; color: black; font-size:18px">` + unitNum + `</label>
              </div>

              <div style="text-align:center; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:18px">Description of Items:  </label>
              <label style="text-align:left; color: black; font-size:18px">` + descItem + `</label>
              </div>

              <div style="text-align:center; width: max-width; padding-top: 10px">
              <label style="text-align:left; color: black; font-size:18px">Mobile Number:  </label>
              <label style="text-align:left; color: black; font-size:18px">` + mobileNum + `</label>
              </div>
         </section>`,          
            showCloseButton: true,
            showConfirmButton: false,
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
      <label class="container">Do you have more parcel with the same owner ?
        <input type="checkbox" v-model="checked" @change="handleCheckboxChange">
        <span class="checkmark"></span>
        </label>

        <div class="input-field" :class="{invalid: recipientNameValidity === 'invalid'}">  
          <input name="recipient-name" id="recipient-name" 
          type="text" required v-model.trim="enteredRecipientName" @blur="validateInputRN" />
          <label for="recipient-name">Name</label>
          <p v-if="recipientNameValidity === 'invalid'">Please enter a valid name!</p>
        </div>

        <div class="input-field" :class="{invalid: unitNumberValidity === 'invalid'}">  
          <input name="unit-number" id="unit-number" type="number"
          required v-model.trim="enteredUnitNumber" @blur="validateInputUN" />
          <label for="unit-number">Unit Number</label>
          <p v-if="unitNumberValidity === 'invalid'">Please enter a valid unit number!</p>
        </div>

        <div class="input-field" :class="{invalid: descItemValidity === 'invalid'}">  
          <input name="description-item" id="description-item" type="text" required v-model.trim="enteredDescItem" @blur="validateInputDI" />
          <label for="description-item">Description Of Items</label>
          <p v-if="descItemValidity === 'invalid'">Please enter a valid description item!</p>
        </div>

        <div class="input-field" :class="{invalid: contactNumberValidity === 'invalid'}">  
          <input name="contact-number" id="contact-number" 
          type="text" required v-model.trim="enteredContactNum" @blur="validateInputCN" />
          <label for="contact-number">Contact Number</label>
          <p v-if="contactNumberValidity === 'invalid'">Please enter a valid number!</p>
        </div>

        <div>
          <button class="buttonAdd" @click="addParcel">Add Parcel</button>
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
            <th></th>
            </tr>
            <tr id="items" v-for="(goal, index) in goals" :key="goal.parcel_id, index">
            <td @click="showParcels(goal.parcel_id, goal.recipients_name, goal.recipients_unit_number, goal.recipients_description_of_items, goal.recipients_mobile_no)">{{ goal.recipients_unit_number }}</td>
            <td @click="showParcels(goal.parcel_id, goal.recipients_name, goal.recipients_unit_number, goal.recipients_description_of_items, goal.recipients_mobile_no)">{{ goal.recipients_name }}</td>
            <td @click="showParcels(goal.parcel_id, goal.recipients_name, goal.recipients_unit_number, goal.recipients_description_of_items, goal.recipients_mobile_no)">{{ goal.recipients_mobile_no }}</td>
            <td @click="editParcels(index, goal.parcel_id, goal.recipients_name, goal.recipients_unit_number, goal.recipients_description_of_items, goal.recipients_mobile_no)"><img id="edit" src="../assets/edit.png"/></td>
            <td @click="deleteParcels(goal.parcel_id)"><img id="delete" src="../assets/delete.png"/></td>
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