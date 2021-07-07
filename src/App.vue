<template>
  <v-app id="app" class="">
    <div class="navigation-bar ">
      <navigation-bar></navigation-bar>
    </div>

    <router-view class=""></router-view>
    <br />
    <v-footer padless class="">
      <v-row class=" pa-1 pa-sm-3 pb-sm-2">
        <v-col
          class="d-flex justify-center justify-sm-start  col-12 col-sm-6 pb-0 pb-sm-2"
        >
          <p>Created by S.o.F. Creations</p>
        </v-col>
        <v-col class="text-center text-sm-right col-12 col-sm-6 pt-0 pt-sm-2 ">
          {{ new Date().getFullYear() }} —
          <strong>All Rights Reserved <sup>&copy;</sup></strong>
        </v-col></v-row
      >
    </v-footer>

    <snackbar></snackbar>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import Snackbar from './components/Snackbar.vue';
export default {
  name: 'App',
  components: { NavigationBar, Snackbar },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Lato', sans-serif;
}

.navigation-bar {
  height: 100%;
  max-height: 125px;
}
</style>
