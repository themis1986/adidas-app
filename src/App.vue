<template>
  <v-app>
    <div class="navigation-bar"><navigation-bar></navigation-bar></div>

    <router-view></router-view>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
export default {
  name: 'App',
  components: { NavigationBar },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.navigation-bar {
  height: 125px;
}
</style>
