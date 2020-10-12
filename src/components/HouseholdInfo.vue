<template>
  <div class="Household Info">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Household Info
            </p>
          </header>
          <div class="card-content">
            <div v-if="members.length >= 0">
              <div v-for="(person) in members" v-bind:key="person">
                <div class="columns">
                  <div class="column"></div>
                  <div class="column">
                    {{person.first_name}}
                  </div>
                  <div class="column">
                    {{person.birthdate}}
                  </div>
                  <div class="column">
                    <router-link :to="{name: 'AddMember', params: {first_name: person.first_name, last_name: person.last_name}}">
                      <button id="Editmember">Edit</button>
                    </router-link>
                  </div>
                  <div class="column"></div>
                </div>
              </div>
              <div class="field buttons is-centered">
                <router-link :to="{name: 'AddMember'}">
                  <button id="add_member">Add Member</button>
                </router-link>
              </div>
            </div>
            <div v-else id="nomember">
              <div class="field buttons is-centered">
                <router-link :to="{name: 'AddMember', params: {name: null}}">
                  <button id="add_member">Add Member</button>
                </router-link>
              </div>
            </div>
            <br />
            <div>
              <p class="title is-6">Does anyone in the Household recieve Social Security?</p>
              <div class="field">
                <div class="control radio is-centered">
                  <span class="radio" name="social">
                    <input type="radio" name="social" v-model="has_social" value="true">
                    Yes
                  </span>
                  <span class="radio" name="social">
                    <input type="radio" name="social" v-model="has_social" value="false">
                    No
                  </span>
                </div>
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
        has_social: false,
        full_name: "",
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid +'/dwelling_heat')
      },
      next() {
        console.log("adding members...")
        this.$router.push('/application/' + this.uid + '/dhi')
      },
      edit(first, last) {
        this.full_name = first + " " + last
        console.log("editing member "+ this.full_name)
        this.$router.push({path: '/application/' + this.uid + '/household_info/add_member', params: {name: this.full_name}})
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          db.collection('users').doc(this.uid)
          .collection('members').get().then(querySnapshot => {
            console.log(querySnapshot.docs)
            querySnapshot.docs.forEach(doc => {
              this.members.push(doc.data());
              console.log('Members: ', this.members)
            })
          });  
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>