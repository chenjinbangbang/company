<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
//解决第二层modal被全屏覆盖的问题
.v-modal {
  z-index: 2000 !important;
}
//上传图片的提示
.upload_tip {
  color: #f00;
  line-height: 25px;
}
</style>
