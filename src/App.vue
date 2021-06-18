<template>
  <div id="app">
   <Dashboard :key="reloadBoard" />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
// import Pannel from './components/Pannel.vue'



export default {
  name: 'App',
  components: {
    Dashboard,
  },
  data(){
    return {
      reloadBoard: 0
    }
  },
  mounted(){
    this.forceRerender()
  },
  methods: {
    forceRerender() {
      this.reloadBoard += 1;  
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  height: 100%;

}


</style>
