<template>
  <v-container fluid class="pb-0" id="home">
    <v-row class="home d-flex align-content-center">
      <v-row class="mt-16 py-10">
        <v-col class="d-flex justify-center align-center col-12 mt-10">
          <v-form ref="form" class="d-flex align-center">
            <v-text-field
              label="Enter product code"
              color="black"
              v-model="searchedValue"
              :rules="textRules"
            >
            </v-text-field>
            <v-btn class="ml-4" @click="searchDatabase">Search</v-btn>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="dark"
              class="ml-3"
            ></v-progress-circular>
          </v-form> </v-col
      ></v-row>

      <v-row class="mt-1">
        <v-col class="d-flex justify-center col-12 col-sm-4 pl-10 ">
          <h1 class="text-sm-center">Welcome Team!</h1>
        </v-col>
        <v-col class=" px-16 text-center col-12 col-sm-8">
          <p>
            To start using the ADIDAS Mismatched pairs application hit the
            <span class="highlighted">New</span> tab in the navigation menu and
            register the mismatched product you found in the store!<br />To
            search for an item already registered use the
            <span class="highlighted">Search field </span>above (Use the unique
            product code in the search field)!You can also see for the list of
            all reagistered mismatched products in the
            <span class="highlighted">Inventory</span> page from the navigation
            menu!
          </p>
        </v-col>
      </v-row>
    </v-row>
    <edit-product-dialog
      :dialog="toggleDialog"
      :usersData="foundProduct"
      @toggleDialog="toggle"
      @deleteItem="softDelete"
      @updateItem="update"
    >
    </edit-product-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
// import goTo from 'vuetify/lib/services/goto';
import EditProductDialog from '../components/EditProductDialog.vue';
export default {
  name: 'Home',
  components: { EditProductDialog },
  emits: ['toggleDialog', 'deleteItem', 'updateItem'],
  data() {
    return {
      textRules: [
        value => {
          if (!value) {
            return 'Field must not be empty!';
          } else {
            return true;
          }
        }
      ],
      searchedValue: '',
      id: [],
      results: [],
      foundProduct: {},
      toggleDialog: false,
      loading: false
    };
  },
  methods: {
    searchDatabase() {
      if (!this.searchedValue) {
        const payload = 'Search field empty.Try again!';
        this.$store.dispatch('openSnackbar', payload);
        return;
      }
      if (Object.keys(this.foundProduct).length !== 0) {
        this.foundProduct = {};
      }
      this.loading = !this.loading;
      const url =
        'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys.json';
      axios.get(url).then(res => {
        const data = res.data;
        this.results = Object.values(data);
        this.id = Object.keys(data);
        this.results.forEach((result, i) => (result.id = this.id[i]));
        // console.log(this.results);
        for (const res of this.results) {
          if (res.productCode === this.searchedValue.toUpperCase()) {
            this.foundProduct = { ...res };
            this.loading = !this.loading;
            break;
          }
        }
        this.$refs.form.reset();
        if (Object.keys(this.foundProduct).length === 0) {
          const payload = 'Sorry nothing found!';
          this.$store.dispatch('openSnackbar', payload);
          this.loading = !this.loading;
          return;
        }
        this.toggle();
      });
    },
    toggle() {
      this.toggleDialog = !this.toggleDialog;
    },
    softDelete() {
      // console.log(this.foundProduct.id);
      this.results.forEach((result, i) => {
        if (result.id === this.foundProduct.id) {
          // this.results.splice(i, 1);
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
        if (result.id === this.foundProduct.id) {
          delete this.foundProduct.id;
          const url =
            'https://in-store-operations-app-default-rtdb.europe-west1.firebasedatabase.app/surveys';
          axios.patch(`${url}/${result.id}.json`, this.foundProduct);
        }
      });
      this.toggle();
    }
  },
  mounted() {},
  updated() {}
};
</script>

<style lang="scss">
.home {
  height: 150vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(#919693, 0.8),
      rgba(#d8d8d8, 0.8)
    ),
    url(../assets/home-bg.jpg);
  background-size: cover;
  background-position: bottom;
  h1 {
    color: black;
  }
  .highlighted {
    font-weight: 700;
  }
}
</style>
