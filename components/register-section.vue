<template>
  <div>
    <v-col v-show="registerByPhoneNumber === false">
      <div class="login-title">สมัครสมาชิก</div>
      <v-btn
        outlined
        class="sign-up-button-mobile"
        type="button"
        @click="handleRegisterByPhoneNumber"
        >สมัครสมาชิกด้วยเบอร์โทรศัพท์</v-btn
      >
      <v-divider class="horizontal-divider" horizontal />
      <v-btn
        outlined
        class="sign-up-button"
        type="button"
        @click="() => signInWithPopup('google')"
      >
        <v-row>
          <!-- <v-col>
          <v-img id="login-by-google-button-image" class="sign-up-img" :src="require('@/assets/images/google-logo.svg')" contain  />
        </v-col> -->
          <v-col>
            <span>ลงทะเบียนเข้าใช้ด้วย Google</span>
          </v-col>
        </v-row>
      </v-btn>
      <v-btn outlined class="sign-up-button" type="submit"
        >ลงทะเบียนเข้าใช้ด้วย LINE</v-btn
      >
      <v-btn outlined class="sign-up-button" type="button"  @click="() => signInWithPopup('facebook')"
        >ลงทะเบียนเข้าใช้ด้วย Facebook</v-btn
      >
      <v-row class="signup-section">
        <div>มีบัญชีผู้ใช้แล้ว?</div>
        <router-link to="/login">เข้าสู่ระบบ</router-link>
      </v-row>
    </v-col>
    <v-col v-show="registerByPhoneNumber === true">
      <h3>สมัครสมาชิกกับ Q-CHANG</h3>
      <form>
        <div class="form-group">
          <label class="signup-phone-email-label" for="telephone"
            >กรอกเบอร์มือถือ</label
          >
          <input
            class="signup-phone-email-input"
            v-model="phoneNumber"
            type="tel"
            id="telephone"
            placeholder="กรอกเบอร์มือถือ"
            required
          />
        </div>
        <div class="form-group">
          <label class="signup-phone-email-label" for="password"
            >รหัสผ่าน</label
          >
          <input
            class="signup-phone-email-input"
            v-model="password"
            type="password"
            id="password"
            placeholder="กรุณากรอกรหัสผ่าน"
            required
          />
        </div>
        <v-btn
          outlined
          class="sign-up-button"
          @click.prevent="signupWithEmailAndPassword"
          >สมัครสมาชิก</v-btn
        >
      </form>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RegisterSection",
  data: () => ({
    registerByPhoneNumber: false,
    phoneNumber: "",
    password: "",
  }),
  methods: {
    handleRegisterByPhoneNumber() {
      this.registerByPhoneNumber = true;
    },

    signupWithEmailAndPassword() {
      const { createUserWithEmailAndPassword } = this?.$fireV9.fireAuth;
      createUserWithEmailAndPassword(
        this?.$fireV9.instanceAuth,
        this.phoneNumber,
        this.password
      )
        .then((result) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    },

    signInWithPopup(providerSignIn: string) {
      const { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } =
        this?.$fireV9.fireAuth;

      if (providerSignIn === "google") {
       let providerAuth = new GoogleAuthProvider();
       signInWithPopup(this?.$fireV9.instanceAuth, providerAuth)
        .then((result) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
      }else if(providerSignIn === "facebook"){
        let providerAuth = new FacebookAuthProvider();
        signInWithPopup(this?.$fireV9.instanceAuth, providerAuth)
        .then((result) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
      }

      // if (!providerAuth) {
      //   alert("Provider not found");
      // }

     
    },
  },
});
</script>

<style lang="scss" scoped>
.sign-up-button {
  width: 100%;
  height: auto;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 20px;
  margin-bottom: 5px;
  &-mobile {
    @extend .sign-up-button;
    background-color: #f04e30;
    border: none;
    color: #fff;
  }
}
.login-title {
  font-weight: bold;
  color: $color-primary;
  align-self: flex-start;
  font-size: 36px;
  line-height: 120%;
  margin-bottom: 20px;
}
.horizontal-divider {
  margin-top: 24px;
  margin-bottom: 4px;
}
.sign-up-button {
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: center !important;
}
.sign-up-img {
  object-fit: contain;
}
.signup-section {
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: end;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.signup-phone-email {
  &-input {
    border: 2px solid #ced4da;
    border-radius: 8px;
    width: 100%;
    padding: 6px 12px;
  }
  &-label {
    margin-top: 12px;
    margin-bottom: 4px;
  }
}
</style>
