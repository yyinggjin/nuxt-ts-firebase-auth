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
          <v-col class="login-modal-info">
            <login-q-chang-info />
          </v-col>
          <v-divider vertical />
          <v-col class="login-modal-form-section">
            <div class="login-email-password">
              <v-col class="login-section">
                <login-section />
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
import LoginSection from "./login-section.vue";
export default Vue.extend({
  name: "LoginModal",
  components: {
    "login-q-chang-info": LoginQChangInfo,
    "login-section": LoginSection,
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

  &-modal-form-section {
    display: flex;
    padding: 15px;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
.login-modal-info{
  display: flex;
  align-items: center;
  justify-content: center;
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
