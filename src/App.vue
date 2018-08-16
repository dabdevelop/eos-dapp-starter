<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted(){
    var createElement = document.createElement;
    document.createElement = function (tag) {
      switch (tag) {
        case 'script':
          //console.log('禁用动态添加脚本，防止广告加载');
          break;
        default:
          return createElement.apply(this, arguments);
      }
    }
  },

  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
