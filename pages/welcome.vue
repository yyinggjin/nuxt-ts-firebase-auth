<template>
  <div>
    <v-container>
        <h1>Welcome</h1>
        <v-btn class="logout-btn" type="button" @click="signOutApp">logout</v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginSection from "../components/login-section.vue";
export default Vue.extend({
  name: "WelcomePage",
  components: {
    "login-section": LoginSection,
  },
  methods:{
    signOutApp(){
      const {signOut} = this?.$fireV9.fireAuth
      signOut(this?.$fireV9.instanceAuth).then((result) => {
        this.$router.push('/login');
      }).catch((error) => {
        alert(error.message)
      })
    }
  }
});
</script>

<style lang="scss" scoped>
.logout-btn{
  margin-top: 20px;
}
</style>
