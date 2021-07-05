<template>
  <v-container class="main d-flex justify-center align-center">
    <v-row class="d-flex pa-10 pa-sm-16 mt-10">
      <v-col class=" col-12 pa-1 pa-sm-16 text-center ">
        <p>This project was created for experimental purposes.</p>
        <br />
        <p>
          Authors of this project do not claim any of the inellectual property
          of Adidas company as their own.
        </p>

        <p>You may use the application but do not claim it as your own work!</p>

        <p>
          Authors of this project retain the right to remove the application any
          time in the future.
        </p>
        <p>All Rights Reserved <sup>&copy;</sup></p>
      </v-col>
    </v-row>
  </v-container>
</template>
>
<script>
export default {};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  background-image: linear-gradient(
      to left top,
      rgba(#919693, 0.8),
      rgba(#d8d8d8, 0.8)
    ),
    url(../assets/max-letek-SvfBv5FLrHg-unsplash.jpg);
  background-size: cover;
  background-position: center;
}
</style>
