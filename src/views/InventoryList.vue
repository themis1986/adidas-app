<template>
  <v-container fluid class="">
    <v-row class="d-flex justify-center my-5">
      <h1>Welcome to your Inventory page!</h1>
    </v-row>
    <v-row class=" d-flex pa-5 align-center">
      <v-col class="pa-5 ">
        <p class="text-center">
          In this page you can review all the registered products!<br /><br />
          You can open any of the already registered items seen in the list!
          Just hit the product and a new window will popup showing all the
          pre-registered information about this specific product!<br />
          You can review a registration, update some of the information if you
          want to and also delete a product that you may not need anymore!
          <br /><br />
          You can also search for a specific product in the search field above
          the product list in order to prevent yourself from overlooking some
          results!
        </p>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <v-progress-circular
          v-if="!listLoaded"
          indeterminate
          color="dark"
        ></v-progress-circular>
        <v-card dark v-if="listLoaded">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            dark
            :headers="headers"
            :items="results"
            :search="search"
            :items-per-page="5"
            class="elevation-1"
            @click:row="selectRegisteredItem"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-btn @click="loadResults">Load</v-btn> -->
    <edit-product-dialog
      :dialog="toggleDialog"
      :usersData="resultsObject"
      @toggleDialog="toggle"
      @deleteItem="softDelete"
    ></edit-product-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import EditProductDialog from '../components/EditProductDialog.vue';
export default {
  components: { EditProductDialog },
  emits: ['toggleDialog', 'deleteItem', 'updateItem'],
  data() {
    return {
      search: '',
      listLoaded: false,
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
        // console.log(res.data);
        const data = res.data;
        // console.log(Object.values(data));

        this.results = Object.values(data);
        this.id = Object.keys(data);
        // console.log(this.id);
        this.results.forEach((result, i) => (result.id = this.id[i]));
        // console.log(this.results);
        this.results = this.results.filter(result => result.active === true);
        this.listLoaded = true;
      });
    },
    selectRegisteredItem(e) {
      this.resultsObject = { ...e };
      // console.log(this.resultsObject);
      this.toggleDialog = true;
    },
    toggle() {
      return (this.toggleDialog = !this.toggleDialog);
    },
    softDelete() {
      console.log(this.resultsObject.id);

      this.results.forEach((result, i) => {
        if (result.id === this.resultsObject.id) {
          this.results.splice(i, 1);
          result.active = !result.active;
          // console.log(result.active);
          const url =
            'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys';
          axios.patch(`${url}/${result.id}.json`, {
            active: result.active
          });
        }
      });

      this.toggle();
    }
  },
  mounted() {
    this.loadResults();
  }
};
</script>

<style></style>
