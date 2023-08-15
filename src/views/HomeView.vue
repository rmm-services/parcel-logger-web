<script>
import axios from 'axios';
import QrView from '../views/QrView.vue'

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
            firstNameValidity: 'pending',
            isHidden: false,
            currentTime: new Date(),
            dataResponse: [],
            qr_data: '',
            qr_id: ''
        };
    },
    methods: {
        addGoal() {
            const newitem = {
                parcel_id: this.enteredUnitNumber + this.enteredRecipientName.replace(/\s/g, "").toLocaleUpperCase() + this.formattedDateTime + this.enteredFirstName.charAt(0).toLocaleUpperCase() + this.enteredLastName.toLocaleUpperCase(),
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
            if (this.goals.length === 0) {
                this.isHidden = false;
            }
            else {
                this.isHidden = true;
            }
        },
        clearFields() {
            this.goals = "";
            this.isHidden = false;
        },
        validateInput() {
            if (this.firstName === '') {
                this.firstNameValidity = 'invalid';
            }
            else {
                this.firstNameValidity = 'valid';
            }
        },
        submit() {
            const apiData = {
                rider_details: this.goals
            };
            axios.post('http://localhost:80/v1/api/add/bulk/parcel', apiData)
                .then(response => {
                const dataRes = [{
                        data: response.data
                    }];
                this.dataResponse = response.data;
                const qrvalue = this.dataResponse.data.map((data) => {
                    return data.rider_qr_details;
                });
                this.qr_id = qrvalue;
                this.$router.push(`/qr/${this.qr_id[0]}`);
            })
                .catch(error => {
                console.error('Error:', error);
            });
        }
    },
    computed: {
        formattedDateTime() {
            const hours = String(this.currentTime.getHours()).padStart(2, "0");
            const month = String(this.currentTime.getMonth() + 1).padStart(2, "0");
            const day = String(this.currentTime.getDate()).padStart(2, "0");
            const year = this.currentTime.getFullYear();
            return `${month}${day}${year}${hours}`;
        },
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
      QrView
    }
}
</script>

<template>
  <div id="app">
    <form>
      <h2>SENDER</h2>
      <hr>
      <div class="form-control" :class="{invalid: firstNameValidity === 'invalid'}">

        <div class="input-field">  
          <input name="rider-first-name" id="rider-first-name" type="text" required v-model.trim="enteredFirstName" @blur="validateInput" />
          <label for="rider-first-name">Rider's First Name</label>
        </div>

        <div class="input-field">  
          <input name="rider-last-name" id="rider-last-name" type="text" required v-model.trim="enteredLastName" @blur="validateInput" />
          <label for="rider-last-name">Rider's Last Name</label>
        </div>

        <div class="input-field">  
          <input name="rider-courier" id="rider-courier" type="text" required v-model.trim="enteredCourier" @blur="validateInput" />
          <label for="rider-courier">Courier</label>
        </div>

      <h2>RECIPIENT</h2>
      <hr>

        <div class="input-field">  
          <input name="recipient-name" id="recipient-name" type="text" required v-model.trim="enteredRecipientName" @blur="validateInput" />
          <label for="recipient-name">Name</label>
        </div>

        <div class="input-field">  
          <input name="unit-number" id="unit-number" type="text" required v-model.trim="enteredUnitNumber" @blur="validateInput" />
          <label for="unit-number">Unit Number</label>
        </div>

        <div class="input-field">  
          <input name="description-item" id="description-item" type="text" required v-model.trim="enteredDescItem" @blur="validateInput" />
          <label for="description-item">Description Of Items</label>
        </div>

        <div class="input-field">  
          <input name="contact-number" id="contact-number" type="text" required v-model.trim="enteredContactNum" @blur="validateInput" />
          <label for="contact-number">Contact Number</label>
        </div>

        <div>
          <button class="buttonAdd" @click="addGoal">Add Parcel</button>
          <button class="buttonClear" @click="clearFields">Clear All</button>
        </div>

        <div v-if=isHidden>
          <table id="parcels" >
            <tr>
            <th>Unit Number</th>
            <th>Recipient Name</th>
            <th>Contact Number</th>
            </tr>
            <tr  id="items" v-for="goal in goals">
            <td>{{ goal.recipients_unit_number }}</td>
            <td>{{ goal.recipients_name }}</td>
            <td>{{ goal.recipients_mobile_no }}</td>
            </tr>
          </table>
        </div>

        <div>
          <button class="btnDone" @click="submit">Done</button>
          
        </div>

      </div>
    </form>
  </div>
</template>
