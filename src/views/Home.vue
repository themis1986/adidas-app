<template>
  <v-container fluid>
    <v-row class="home d-flex align-content-center ">
      <v-col class="d-flex justify-center align-center col-12 mt-10">
        <div class="">
          <v-text-field label="Search item" color="black"> </v-text-field>
        </div>
        <v-btn class="ml-4" color="">Search</v-btn>
      </v-col>

      <v-col class="d-flex justify-center col-12 col-sm-6 ">
        <h1>Welcome Team!</h1>
      </v-col>
      <v-col class=" px-12 text-center col-12 col-sm-6">
        <p>
          To start using the ADIDAS Mismatched pairs application hit the
          <span class="highlighted">New</span> tab in the navigation menu and
          register the mismatched product you found in the store!<br />To search
          for an item already registered use the
          <span class="highlighted">Search field </span>above (Use the unique
          product code in the search field)!
        </p>
      </v-col>
    </v-row></v-container
  >
</template>

<script>
export default {
  name: 'Home',

  components: {}
};
</script>

<style lang="scss">
.home {
  height: 100vh;
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
