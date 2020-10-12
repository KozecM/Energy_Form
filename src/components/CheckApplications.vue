<template>
  <div class="All Applications">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              All Applications
            </p>
          </header>
          <div class="card-content">
            <div v-if="users.length >= 0">
              <div v-for="(person) in users" v-bind:key="person">
                <div class="columns">
                  <div class="column">
                    {{person.email}}
                  </div>
                  <div class="column">
                    <router-link :to="{name: 'SingleApplicant', params: {user_id: person.id, email: person.email}}">
                      <button id="CheckApp">Check Application</button>
                    </router-link>         
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer buttons is-centered">
            <div class="field is-grouped">
              <div class="control">
                <button id="home" v-on:click="home()">Home</button>
              </div>
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
  import {db, functions} from '../firebase';

  export default {
    data() {
      return {
        uid: "",
        users: [],
        is_admin: false,
        GetOptions: {
          source: 'cache'
        }
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
    },

    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          user.getIdTokenResult().then(idTokenResult => {
            if(!idTokenResult.claims.admin){
              this.$router.push('/dashboard')
            }else{
              this.is_admin = idTokenResult.claims.admin
            }
          });
        }else{
          this.$router.push('/');
        }
      });
      db.collection('users')
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(element => {
            db.collection('users').doc(element.id).collection("info").doc("contacts").get()
              .then(snap => {
                console.log(snap.data())
                this.users.push({email: snap.data().email, id: element.id});                
              })
            
          });
          
        })
    },
  } 
/*eslint-enable*/
</script>