<template>
  <div class="q-chang-desc-container">
    <img
      :id="`${$attrs.id}-logo`"
      :src="require('@/assets/images/q-chang-logo-color.svg')"
    />
    <div
      :id="`${$attrs.id}-logo-title-container`"
      class="q-chang-desc font-weight-bold text-primary"
    >
      <div :id="`${$attrs.id}-logo-title-1`">คิวช่าง (Q-CHANG)</div>
      <div :id="`${$attrs.id}-logo-title-2`">ตอบโจทย์ทุกเรื่องช่าง</div>
    </div>
    <div
      :id="`${$attrs.id}-logo-description`"
      class="q-chang-desc2 text-primary font-weight-bold mt-6"
    >
      Join us!
    </div>
    <div>Home & Living service platform</div>
    <div>The Best Partner for your home</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LoginQChangInfo",
});

</script>
<style lang="scss">
.q-chang-desc-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .q-chang-desc {
    font-size: 27px;
    line-height: 26px;
  }

  .q-chang-desc2 {
    font-size: 19px;
    white-space: pre-line;
    line-height: 20px;
  }
}
</style>
