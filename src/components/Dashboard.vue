<template>
  <div class="Page">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              NeighborImpact Energy Assistance Application
            </p>
          </header>
          <div class="card-content">
            <div class="field buttons is-centered">
              <div class="control">
                <button id="note" v-on:click="application">NeighborImpact Energy Assistance Form</button>
              </div>
            </div>
            <div v-if="is_admin === true" class="field buttons is-centered">
              <div class="control">
                <p class="card-header-title is-centered" v-if="is_admin === true"> Admin View </p>
                <div class="columns">
                  <div class="column">
                    <input class="input" type="email" placeholder="User Email" v-model="admin_email">
                  </div>
                  <div class="column">
                    <button id="add-admin" @click="add_admin()">Make Admin</button>
                  </div>
                </div>
                
              </div>
            </div>
            <div v-if="is_admin === true" class="field buttons is-centered">
              <div class="control">
                <button id="check-applications" @click="check_apps()">Check Applications</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import firebase from "firebase";
  import {db, functions} from "../firebase"

  export default {
    data() {
      return{
        email: '',
        uid: '',
        admin_email: '',
        is_admin: false,
      };
    },

    methods: {
      signOut: function () {
        firebase.auth().signOut()
        .then(() => {
          this.$router.push('/');
        });
      },
      application: function () {
        db.collection('users').doc(this.uid).set({
            dummy: 'dummy'
          }).then(this.$router.push('/application/' + this.uid))
        
      }, 
      add_admin() {
        const addAdminRole = functions.httpsCallable('addAdminRole');

        addAdminRole({email: this.admin_email}).then(result => {
          console.log(result);
        })
      },
      check_apps() {
        this.$router.push('/check_apps')
      }
    },

    mounted: function () {

      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          this.email = user.email;
          user.getIdTokenResult().then(idTokenResult => {
            this.is_admin = idTokenResult.claims.admin
          })
        }else{
          this.$router.push('/');
        }
      })
    }
  };
/*eslint -enable*/
</script>

<style scoped>

@import '../../css/mystyles.css';
h3 {
  color: darkgreen;
}

</style>