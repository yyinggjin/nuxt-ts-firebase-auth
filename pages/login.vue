<template>
    <div class="container">
      <login-modal />
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import LoginModal from "@/components/login-modal.vue";
  
  export default Vue.extend({
    name: "LoginPage",
    components: {
      "login-modal": LoginModal,
    },
  });
  </script>
  
  <style lang="scss" scoped>
  @import "~/assets/variables.scss";
  
  </style>
  