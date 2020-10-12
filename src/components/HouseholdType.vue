<template>
  <div class="HouseholdType">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Type of Household
            </p>
          </header>
          <div class="card-content">
            <div class="columns">
              <div class="column">
                <label class="radio is-pulled-left">
                  <input type="radio" id="ExtendedFamily" name="answer" value="Extended Family" v-model="household_type">
                  <label for="ExtendedFamily"> Extended Family</label>
                </label>
                <br />
                <label class="radio is-pulled-left">
                  <input type="radio" id="Co-habitants" name="answer" value="Co-habitants" v-model="household_type">
                  <label for="Co-habitants"> Co-habitants</label>
                </label>
                <br />
                <label class="radio is-pulled-left">
                  <input type="radio" id="Two-Parent" name="answer" value="Two-Parent" v-model="household_type">
                  <label for="Two-Parent"> Two-Parent</label>
                </label>
                <br />
                <label class="radio is-pulled-left">
                  <input type="radio" id="Married" name="answer" value="Married" v-model="household_type">
                  <label for="Married"> Married</label>
                </label>
              </div>
              <div class="column">
                <label class="radio is-pulled-left">
                  <input type="radio" id="Single" name="answer" value="Single" v-model="household_type">
                  <label for="Single"> Single</label>
                </label>
                <br />
                <label class="radio is-pulled-left">
                  <input type="radio" id="Single_Parent_M" name="answer" value="Single Parent Male" v-model="household_type">
                  <label for="Single_Parent_M"> Single Parent Male</label>
                </label>
                <br />
                <label class="radio is-pulled-left">
                  <input type="radio" id="Single_Parent_F" name="answer" value="Single Parent Female" v-model="household_type">
                  <label for="Singe_Parent_F"> Single Parent Female</label>
                </label>
              </div>
            </div>
          </div>  
          <footer class="card-footer buttons is-centered">
            <div class="control"> 
              <button id="home" v-on:click="home()">Home</button>
              <button id="back" v-on:click="back()">Back</button>
              <button id="next" v-on:click="next()">Next</button>
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
        household_type: ""
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid +'/address_info')
      },
      next() {
        db.collection('users').doc(this.uid)
          .collection('info').doc('household_type').set({
            household_type: this.household_type
        }, {merge: true}).then(
          this.$router.push('/application/' + this.uid + "/dwelling_heat")
        );
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;

          db.collection('users').doc(user.uid)
            .collection('info').doc('household_type').get()
            .then(snapshot => {
              console.log(snapshot.data())
              this.household_type = snapshot.data()['household_type']
            })
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>