<template>
  <v-container fluid class=" main mt-7">
    <v-row class=" d-flex justify-center my-16">
      <h1 class="text-center">Welcome to your Inventory page!</h1>
    </v-row>
    <v-row class=" d-flex pa-1 pa-sm-5 align-center">
      <v-col class=" pa-2 pa-sm-5 px-lg-16 col-12 col-md-6  ">
        <p class="text-center">
          In this page you can review all the registered products!<br /><br />
          You can open any of the already registered items seen in the list!
          Just hit the product and a new window will popup showing all the
          pre-registered information about this specific product!<br /><br />
          You can review a registration, update some of the information if you
          want to and also delete a product that you may not need anymore!
          <br /><br />
          You can also search for a specific product in the search field above
          the product list in order to prevent yourself from overlooking some
          results!
        </p>
      </v-col>
      <v-col class="d-flex justify-center align-center col-12 col-md-6">
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
            mobile-breakpoint="xs"
            :options="options"
            :headers="headers"
            :items="results"
            :search="search"
            :items-per-page="options.itemsPerPage"
            class="elevation-1"
            @click:row="selectRegisteredItem"
            :footer-props="{
              itemsPerPageOptions: [1, 5, 10]
            }"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <edit-product-dialog
      :dialog="toggleDialog"
      :usersData="resultsObject"
      @toggleDialog="toggle"
      @deleteItem="softDelete"
      @updateItem="update"
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
      itemsPerPageSelect: [1, 5, 10],
      options: {
        itemsPerPage: 5
      },
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
  computed: {},
  methods: {
    updateItemsPerPage() {
      if (window.innerWidth < 600) {
        this.options.itemsPerPage = 1;
      } else {
        this.options.itemsPerPage = 5;
      }
    },
    loadResults() {
      const url =
        'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys.json';
      axios.get(url).then(res => {
        if (!res.data) {
          this.listLoaded = true;
          return;
        }
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
      // console.log(this.resultsObject.id);

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
    },
    update() {
      this.results.forEach((result, i) => {
        if (result.id === this.resultsObject.id) {
          delete this.resultsObject.id;
          // console.log(this.resultsObject);
          const url =
            'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys';
          axios.patch(`${url}/${result.id}.json`, this.resultsObject);
        }
      });
      this.toggle();
    }
  },
  mounted() {
    this.loadResults();
    this.updateItemsPerPage();
  },
  updated() {
    this.loadResults();
    this.updateItemsPerPage();
  }
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  background-image: linear-gradient(
      to right bottom,
      rgba(#919693, 0.8),
      rgba(#d8d8d8, 0.8)
    ),
    url(../assets/inventory.jpg);
  background-size: cover;
  background-position: bottom left;
}
</style>
