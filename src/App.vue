<template>

  <div id="app">
    <section class="hero is-fullheight is-grey-dark is-bold">
      <!-- Hero header: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="../public/logo.png" alt="Logo" class="image">      
            </a>
            <!--
        Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
            <div class="navbar-burger" v-on:click="showNav = !showNav" :class="{ 'is-active': showNav }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <!--
        Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
          <div class="navbar-menu" :class="{ 'is-active': showNav }">
            <div class="navbar-end">
              <a @click="logout()" class="navbar-item">
                Logout
              </a>
            </div>
          </div>
        </nav>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  el: '#app',
  data() {
    return{
      showNav: false,
    }    
  },

  methods: {
    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>

html {
  background-color: white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
button {
  display: inline-block;
  border: 3px solid #FED02A;
  padding: 6px 19px;
  margin:0 5px 5px 0;
  border-radius: 2px;
  box-sizing: border-box;
  text-decoration: none;
  color:black;
  text-align: center;
  background-color: transparent;
  transition: all 0.3s;
}

button:hover{
  color: black;
  background-color: #FED02A;
}

canvas{
  border: black 3px solid
}
</style>
