<template>
  <div>
    <v-dialog v-model="showModal" max-width="1096" class="modal-container">
      <v-card
        id="login-modal-card"
        class="login-card-container"
        height="74vh"
        max-height="700"
      >
        <v-row class="modal-content">
          <v-col class="login-modal-info"
            ><login-q-chang-info id="login-modal-info"
          /></v-col>
          <v-divider vertical />
          <v-col class="login-modal-form-section">
            <div class="login-email-password">
              <v-col class="login-section">
                <register-section />
              </v-col>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginQChangInfo from "./login-q-chang-info.vue";

import RegisterSection from "./register-section.vue";
export default Vue.extend({
  name: "RegisterModal",
  components: {
    "login-q-chang-info": LoginQChangInfo,
    "register-section": RegisterSection,
  },
  data() {
    return {
      showModal: true,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 2rem;
}
.login {
  &-card-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
  &-modal-info {
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: center;
  }

  &-modal-form-section {
    display: flex;
    padding: 15px;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
.modal-content {
  overflow-y: auto;
  margin-top: 0.5rem;
}
.login-email-password {
  padding-left: 3.75rem;
  padding-right: 3.75rem;
}
.horizontal-divider {
  margin-top: 24px;
}
// .signup-section {
//   display: flex;
//   justify-content: center;
//   margin-top: 24px;
// }
</style>
