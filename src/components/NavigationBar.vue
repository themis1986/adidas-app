<template>
  <div>
    <v-app-bar app flat prominent>
      <v-container fluid>
        <v-row class="d-flex justify-center justify-sm-space-between">
          <v-col class="test" cols="4">
            <v-img
              lazy-src="../assets/Adidas_Logo.svg"
              max-height="110"
              max-width="110"
              min-width="100"
              src="../assets/Adidas_Logo.svg"
            ></v-img>
          </v-col>
          <v-col cols="8 d-none d-sm-flex justify-end align-center">
            <h1 class="text-h5 text-center">
              ADIDAS Mismatched pairs app
            </h1>
          </v-col>
          <v-row class="d-flex justify-end">
            <ul class="nav-menu d-flex  text-button mr-8">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/new">New</router-link></li>
              <li><router-link to="/inventory">Inventory</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
            <!-- <div class="mr-2">
              <v-text-field label="Search item"> </v-text-field>
            </div>
            <v-btn class="mr-6">Search</v-btn> -->
          </v-row>
        </v-row>
      </v-container>

      <v-row></v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav-menu {
  list-style: none;

  li {
    padding: 10px 10px;
    transition: all 0.2s;
    a {
      padding: 2px;
      text-decoration: none;
      color: #000;
      border-radius: 4px;
      transition: all 0.1s;

      &:hover {
        color: #999da0;
      }
    }
    &:hover {
      transform: translateY(-2px);
    }
    &:active,
    &:visited {
      transform: translateY(0px);
    }
  }
}
.test {
  padding: 0px, 12px !important;
}
</style>
