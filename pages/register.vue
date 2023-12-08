<template>
  <div class="container">
    <register-modal />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RegisterModal from "~/components/register-modal.vue";

export default Vue.extend({
  name: "RegisterPage",
  components: {
    "register-modal": RegisterModal,
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/variables.scss";
</style>
