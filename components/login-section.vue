<template>
    <div id="firebaseui-auth-container" >
      <div class="login-title">เข้าสู่ระบบ</div>
    <form>
      <div class="form-group">
        <label class="login-phone-email-label" for="email"
          >กรอกเบอร์มือถือ / อีเมล</label
        >
        <input
          class="login-phone-email-input"
          v-model="email"
          type="email"
          id="email"
          placeholder="กรอกเบอร์มือถือ / อีเมล"
          required
        />
      </div>
      <div class="form-group">
        <label class="login-phone-email-label" for="password">รหัสผ่าน</label>
        <input
          class="login-phone-email-input"
          v-model="password"
          type="password"
          id="password"
          placeholder="กรุณากรอกรหัสผ่าน"
          required
        />
      </div>
      <div class="forget-password" @click="() => resetPassword()">ลืมรหัสผ่าน</div>
      <v-btn outlined class="login-button" @click.prevent="() => signInWithEmail()"
        >ลงชื่อเข้าใช้บัญชี</v-btn
      >
      <v-btn outlined class="login-button" type="submit"
        >เข้าสู่ระบบด้วย OTP</v-btn
      >
    </form>
    <v-row class="signup-section mt-6 d-flex justify-center">
      <div>ยังไม่มีบัญชี?</div>
      <router-link to="/register">สมัครสมาชิก</router-link>
    </v-row>
    <v-divider class="horizontal-divider" horizontal />
    <div id="login-social-container" class="login-social-container">
      <v-btn class="login-social-button" @click="() => signinWithPopup('google')">
        <v-img
          id="login-by-google-button-image"
          class="login-socia-img"
          :src="require('@/assets/images/google-logo.svg')"
          width="24"
          :aspect-ratio="1"
        />
      </v-btn>
      <v-btn class="login-social-button" @click="() =>signinWithRedirect('google')">
        <v-img
          id="login-by-line-button-image"
          class="login-socia-img"
          :src="require('@/assets/images/LINE_logo.svg.webp')"
          width="24"
          :aspect-ratio="1"
        />
      </v-btn>
      <v-btn class="login-social-button" @click="() =>signinWithPopup('facebook')">
        <v-img
          id="login-by-facebook-button-image"
          class="login-socia-img"
          :src="require('@/assets/images/facebook-logo.svg')"
          width="24"
          :aspect-ratio="1"
        />
      </v-btn>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

export default class LoginSection extends Vue {
  email: string = "";
  password: string = "";
  resultSignIn: string = "";
  currentUser: string = "";
  resultSigninError: string = "";
  providerSignIn: string = "";
  

  signInWithEmail() {
    const { signInWithEmailAndPassword } = this?.$fireV9.fireAuth;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValidEmail =  emailRegex.test(this.email);
    if(isValidEmail){
      signInWithEmailAndPassword(this?.$fireV9.instanceAuth, this.email, this.password).then(result => {
    this.$router.push('/welcome');
   }).catch(error => {
    this.resultSigninError = error.message
    alert(this.resultSigninError)
   })
    }else{
      alert("Email is invalid format")
    }
  
  }

  signinWithPopup(providerSignIn: string) {
    this.clearResult();
    const { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} = this?.$fireV9.fireAuth;
    let providerAuth = null;
    if (providerSignIn === "google") providerAuth = new GoogleAuthProvider();
    if (providerSignIn === "facebook") providerAuth = new FacebookAuthProvider();

    if (!providerAuth) {
      alert("Provider not found");
      this.resultSigninError = "Provider not found";
      return;
    }

    signInWithPopup(this.$fireV9.instanceAuth, providerAuth)
      .then((result) => {
        this.setUserInfo()
      })
      .catch((error) => {
        this.resultSigninError = JSON.stringify(error, null, 2);
        alert(this.resultSigninError)
      });
  }

  async signinWithRedirect(providerSignIn: string) {
    this.clearResult();
    const { signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider } =
      this.$fireV9.fireAuth;

    let providerAuth = null;
    if (providerSignIn === "google") providerAuth = new GoogleAuthProvider();
    if (providerSignIn === 'facebook') providerAuth = new FacebookAuthProvider()
    if (!providerAuth) {
      alert("Provider not found");
      this.resultSigninError = "Provider not found";
      return;
    }
    await signInWithRedirect(this.$fireV9.instanceAuth, providerAuth);
    await this.handleRedirectResult();
  }

  async handleRedirectResult() {
    const { getRedirectResult } = this.$fireV9.fireAuth;
    const result = await getRedirectResult(this.$fireV9.instanceAuth)
      .then((result) => {
        if (!result) return { data: null, error: "result emplty" };
        this.resultSignIn = JSON.stringify({ result, status }, null, 2);
        this.currentUser = JSON.stringify(
          this.$fireV9.instanceAuth.currentUser,
          null,
          2
        );
        this.setUserInfo();
        return { data: result, error: null };
      })
      .catch((error) => {
        this.resultSigninError = JSON.stringify({ error, status }, null, 2);
        return { data: null, error };
      })
      .finally(() => {
        this.providerSignIn = "";
      });
    if (result.error) {
      this.resultSigninError = JSON.stringify(result.error, null, 2);
    } else {
      this.resultSignIn = JSON.stringify(result.data, null, 2);
      this.$router.push('/welcome');
    }
  }

  resetPassword(){
    const {sendPasswordResetEmail} = this?.$fireV9.fireAuth
    sendPasswordResetEmail(this?.$fireV9.instanceAuth, this.email)
    .then(result => {
      alert("Success, reset password email has been sent")
    }).catch(error => {
      alert(error.message)
    })
  }

  clearResult() {
    this.resultSignIn = "";
    this.resultSigninError = "";
    this.currentUser = "";
  }

  async setUserInfo() {
    if (this?.$fireV9.instanceAuth.currentUser) {
      const idToken = await this?.$fireV9.instanceAuth.currentUser.getIdToken();
      if(idToken){
        this.$router.push('/welcome');
      }
      this.$store.dispatch(
        "auth/setUser",
        this.$fireV9.instanceAuth.currentUser
      );
    }else{
      this.$router.push('/register');
      alert("You don't have an account yet");
    }
  }

}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;
}
.login-phone-email {
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
.login-button {
  width: 100%;
  height: auto;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 20px;
  margin-bottom: 5px;
}
.forget-password {
  display: flex;
  justify-content: end;
  color: #265ed6;
  font-size: small;
  margin-top: 8px;
  cursor: pointer;
}
.signup-section {
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}
.login-social {
  &-container {
    width: 100%;
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 480px) {
      flex-direction: column;
      width: 12px;
    }
  }
  &-button {
    margin: 0 10px;
    @media (max-width: 480px) {
      margin: 10px 0px;
    }
  }
  &-img {
    padding: 10px;
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
</style>
