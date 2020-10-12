<template>
  <div class="BadCounty">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Sorry! Area not supported. 
            </p>
          </header>
          <div class="card-content">
            <h2>We are sorry, but we only cover Deschutes, Crook and Jefferson counties. 
              Here are links to service providers who cover other counties:</h2>
            <ul>
              <li><a href="http://www.klcas.org/energy/"> Klamath and Lake Counties </a></li>
              <li><a href=""> Hood River </a></li>
              <li><a href=""> Sherman and Wasco County </a></li>
              <li><a href=""> Wheeler County </a></li> 
            </ul>
          </div>  
          <footer class="card-footer buttons is-centered">
            <div class="control"> 
              <button id="back" v-on:click="back()">Back</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
/*eslint-disable*/
  import firebase from 'firebase'
  import {db} from '../firebase';

  export default {
    data() {
      return {
        uid: "",
        county: ""
      }
    },

    methods: {
      back() {
        this.$router.push('/application/' + this.uid)
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>