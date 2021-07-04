<template class="main">
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="d-flex justify-center pt-5 pb-0">
          <span class="text-h5">Edit Item</span>
        </v-card-title>
        <v-card-text class="">
          <v-container class="px-0">
            <v-form class="register">
              <v-row class="px-5 px-sm-10 mt-5">
                <v-col class=" col-12 ">
                  <v-text-field
                    label="Name"
                    v-model="usersData.name"
                  ></v-text-field>
                </v-col>
                <v-col class=" col-12 ">
                  <v-select
                    :items="storeDepartments"
                    label="Select Department"
                    v-model="usersData.department"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="px-5 px-sm-10">
                <v-col class="col-12 ">
                  <v-text-field
                    label="Product Code (ex.AB1234)"
                    v-model="usersData.productCode"
                  ></v-text-field>
                </v-col>
                <v-col class="col-12 ">
                  <v-text-field
                    label="Genral Info (ex. product name)"
                    v-model="usersData.generalInfo"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="d-flex px-5 px-sm-10 mt-sm-5 mt-0 ">
                <v-col class=" col-12">
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
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions class="mr-5">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('toggleDialog')">
            Close
          </v-btn>
          <v-btn color="green darken-1" text @click="$emit('updateItem')">
            Update
          </v-btn>
          <v-btn color="red darken-1" text @click="$emit('deleteItem')">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
      // default: true
    },
    usersData: {
      type: Object
    }
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      // dialog: false,
      storeDepartments: ['Shoe', 'Apparel'],
      status: [
        'Pending',
        'Checked/Wrong sale',
        'Checked/Stolen',
        'Checked/Damaged'
      ]
      // usersData: {
      //   active: true
      //   // name: '',
      //   // department: '',
      //   // productCode: '',
      //   // generalInfo: '',
      //   // details: '',
      //   // searchStatus: '',
      //   // date: ''
      // }
    };
  }
};
</script>

<style scoped lang="scss"></style>
