<template>
  <v-container fluid class="">
    <v-row class="d-flex justify-center my-5">
      <h1>Welcome to your Inventory page!</h1>
    </v-row>
    <v-row class=" d-flex pa-5">
      <v-col class="pa-5">
        <p class="text-center">
          In this page you can review all the registered products!<br />Hit the
          Load button to get started.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
          tenetur, illum maiores neque itaque dignissimos. Cupiditate,
          repellendus totam. Itaque mollitia consequatur illo earum recusandae
          laboriosam doloremque distinctio quaerat laudantium? Temporibus!
        </p>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <v-data-table
          dark
          :headers="headers"
          :items="results"
          :items-per-page="5"
          class="elevation-1"
          @click:row="selectRegisteredItem"
        >
        </v-data-table>
      </v-col>
    </v-row>
    <v-btn @click="loadResults">Load</v-btn>
    <edit-product-dialog
      :dialog="toggleDialog"
      :usersData="resultsObject"
      @toggleDialog="toggle"
      @deleteItem="deleteItem"
    ></edit-product-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import EditProductDialog from '../components/EditProductDialog.vue';
export default {
  components: { EditProductDialog },
  emits: ['toggleDialog', 'deleteItem'],
  data() {
    return {
      toggleDialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Product code', value: 'productCode' },
        { text: 'Product name', value: 'generalInfo' },
        { text: 'Status', value: 'searchStatus' }
      ],

      id: [],
      results: [],
      resultsObject: {}
    };
  },
  methods: {
    loadResults() {
      const url =
        'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys.json';
      axios.get(url).then(res => {
        // console.log(res);
        const data = res.data;
        // console.log(Object.values(data));
        this.results = Object.values(data);
        this.id = Object.keys(data);
        // console.log(this.id);
        this.results.forEach((result, i) => (result.id = this.id[i]));
        // console.log(this.results);
      });
    },
    selectRegisteredItem(e) {
      this.resultsObject = { ...e };
      console.log(this.resultsObject);
      this.toggleDialog = true;
    },
    toggle() {
      return (this.toggleDialog = !this.toggleDialog);
    },
    deleteItem() {}
  }
};
</script>

<style></style>
