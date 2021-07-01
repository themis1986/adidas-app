<template>
  <v-container>
    <v-form class="register">
      <v-row class="px-10 mt-5">
        <v-col class="mt-sm-16 mt-0 col-12 col-sm-6">
          <v-text-field label="Name" v-model="usersData.name"></v-text-field>
        </v-col>
        <v-col class="mt-sm-16 mt-0 col-12 col-sm-6">
          <v-select
            :items="storeDepartments"
            label="Select Department"
            v-model="usersData.department"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="px-10">
        <v-col class="col-12 col-sm-6">
          <v-text-field
            label="Product Code (ex.AB1234)"
            v-model="usersData.productCode"
          ></v-text-field>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <v-text-field
            label="Genral Info (ex. product name)"
            v-model="usersData.generalInfo"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex px-10 mt-sm-5 mt-0 ">
        <v-col class="col-sm-6 col-12">
          <v-textarea
            filled
            label="Details"
            placeholder="Be as much descriptive as you can in order to help other colleagues search for it in the future!"
            v-model="usersData.details"
          ></v-textarea>
        </v-col>
        <v-col>
          <v-row class="d-flex flex-column">
            <v-col class="d-flex align-start">
              <v-select
                :items="status"
                label="Status"
                class=""
                v-model="usersData.searchStatus"
              ></v-select>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="usersData.date"
                    label="Picker in dialog"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="usersData.date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="px-10 mt-5">
        <v-col class="d-flex justify-center align-center">
          <v-btn color="#7cd668" @click="sendInfo">Register</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,

      storeDepartments: ['Shoe', 'Apparel'],
      status: [
        'Pending',
        'Checked/Wrong sale',
        'Checked/Stolen',
        'Checked/Damaged'
      ],
      usersData: {
        active: true
        // name: '',
        // department: '',
        // productCode: '',
        // generalInfo: '',
        // details: '',
        // searchStatus: '',
        // date: ''
      }
    };
  },
  methods: {
    sendInfo() {
      console.log(this.usersData);
      const url =
        'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys.json';

      axios
        .post(url, this.usersData)
        .then(res => console.log(res))
        .catch(err => console.log(err));

      this.usersData = {
        active: true
      };
    }
  }
};
</script>

<style>
.register {
  height: 100%;
  background-color: #f5f5f5;
}
</style>
