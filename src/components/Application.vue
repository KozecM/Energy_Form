<template>
  <div class="County">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p v-if="errors">
          <b>Please select a county</b>
        </p>
        <div class="field">
          <div class="control">
            <div class="card ">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  County
                </p>
              </header>
              <div class="card-content">
                <div class="columns">
                  <div class="column is-one-fifth"></div>
                  <div class="column ">
                    <ul>
                      <li>
                        <label class="radio">
                          <input type="radio" id="deschutes" name="answer" value="Deschutes" v-model="county">
                          <label for="deschutes"> Deschutes</label>
                        </label>
                      </li>
                      <li>
                        <label class="radio">
                          <input type="radio" id="crook" name="answer" value="Crook" v-model="county">
                          <label for="crook"> Crook</label>
                        </label>
                      </li>
                      <li>
                        <label class="radio">
                          <input type="radio" id="jefferson" name="answer" value="Jefferson" v-model="county">
                          <label for="jefferson"> Jefferson</label>
                        </label>
                      </li>
                      <li>
                        <label class="radio">
                          <input type="radio" id="warmSprings" name="answer" value="Warm_Springs" v-model="county">
                          <label for="warmSprings"> Warm Springs Reservation</label>
                        </label>
                      </li>
                      <li>
                        <label class="radio">
                          <input type="radio" id="other" name="answer" value="Other" v-model="county">
                          <label for="other"> Other</label>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer class="card-footer buttons is-centered">
                <div class="control">
                  <button id="home" v-on:click="home()">Home</button>
                  <button id="next" v-on:click="next()">Next</button>
                </div>
              </footer>
            </div>
          </div>
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
        county: "",
        errors: false
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      next() {
        if(this.county == "Other") {
          this.$router.push('/application/' + this.uid + "/bad_county")
        }else if(this.county == ""){
          this.errors = true;
        }else {
          db.collection('users').doc(this.uid)
            .collection('info').doc('county').set({
              county: this.county
          }).then(
            this.$router.push('/application/' + this.uid + "/contact_info")
          );         
        }  
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;

          db.collection('users').doc(user.uid)
            .collection('info').doc('county').get()
            .then(snapshot => {
              this.county = snapshot.data()['county'];
            })
          var checkexists
          db.collection('users').doc(user.uid).get().then(snapshot => {
            checkexists = snapshot.data().dummy;
          })

          if(checkexists != "dummy"){
            db.collection('users').doc(user.uid).set({
              dummy: 'dummy'
            })
          }
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>

<style scoped>

</style>