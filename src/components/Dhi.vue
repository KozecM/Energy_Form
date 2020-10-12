<template>
  <div class="DHI_info">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Declaration of Household income (DHI)
            </p>
          </header>
          <div class="card-content">
            <div v-if="members.length >= 0">
              <div v-for="(person) in members" v-bind:key="person">
                <div class="columns">
                  <div class="column"></div>
                  <div class="column">
                    {{person.first_name}} {{person.last_name}}
                  </div>
                  <div class="column">
                    <router-link :to="{name: 'AddDhiMember', params: {first_name: person.first_name, last_name: person.last_name}}">
                      <button id="Editdhi">Edit</button>
                    </router-link>
                  </div>
                  <div class="column"></div>
                </div>
              </div>
              <br />
              <div class="field buttons is-centered">
                <router-link :to="{name: 'AddDhiMember'}">
                  <button id="add_dhi_member">Add Member</button>
                </router-link>
              </div>
            </div>
            <div v-else id="nomember">
              <div class="field buttons is-centered">
                <button id="add_member">Add Member</button>
              </div>
            </div>
            <br />
            <div>
              <p class="title is-6">Total Household Income</p>
              <div class="field">
                <label class="label is-pulled-left">Total Income</label> 
                <p class="control has-icons-left">
                  <i class="$">$ </i>{{household_income}}
                </p>
              </div>
            </div>
          </div>
          <footer class="card-footer buttons is-centered">
            <div class="field is-grouped">
              <div class="control">
                <button id="home" v-on:click="home()">Home</button>
                <button id="back" v-on:click="back()">Back</button>
                <button id="next" v-on:click="next()">Next</button>
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
  import {db} from '../firebase';

  export default {
    data() {
      return {
        uid: "",
        Household_count: 1,
        members: [],
        member:  {
          first_name: "",
          last_name: "",
          highschool: false,
          income_type: "",
          income: 0,
          id: "",
        },
        household_income: 0,
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },

      back() {
        this.$router.push('/application/' + this.uid +'/household_info')
      },

      next() {
        console.log("adding income...")
        db.collection('users').doc(this.uid)
          .collection('dhi_income').doc('income').set({
            household_income: this.household_income
          }).then(
            this.$router.push('/application/' + this.uid + '/more_info_1')
          )
      },

    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          db.collection('users').doc(this.uid)
          .collection('dhi').get().then(querySnapshot => {
            console.log(querySnapshot.docs)
            querySnapshot.docs.forEach(doc => {
              this.members.push(doc.data());
              this.household_income += parseFloat(doc.data().income)
            })
          })
          
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>