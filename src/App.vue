<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  position: absolute;
  top: 0.2rem;
  bottom: 0.8rem;
  width: 100%;
  height: calc(100% - 0.8rem);
  font-size: 0.2rem;
}
#app * {
  box-sizing: border-box;
}
.disabled {
  color: #aaa !important;
}
button {
  border: none;
  outline: none;
  cursor: pointer;
}
* {
  margin: 0;
  padding: 0;
  font-family: 微软雅黑;
}

a {
  text-decoration: none;
  cursor: pointer;
}

input {
  outline: none;
}

li {
  list-style: none;
}
.el-checkbox .el-checkbox__label{
  font-size: 0.3rem;
}
/* .el-checkbox__inner{
      width: 0.3rem;
    height: 0.3rem;
} */
</style>
