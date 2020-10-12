<template>
  <div class="ContactInfo">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Contact Info
            </p>
          </header>

          <div class="card-content">
            <div class="field"> 
              <div class="control">
                <div class="columns">
                  <div class="column">
                    <p class="title is-5">First Name </p>
                    <input class="input" type="text" placeholder="First Name" v-model="first">
                  </div>
                  <div class="column">
                    <p class="title is-5">Last Name </p>
                    <input class="input" type="text" placeholder="Last Name" v-model="last">
                  </div>
                </div>
              </div>
            </div>
            <div class="field"> 
              <div class="control">
                <p class="title is-5"> Phone Number </p>
                <input class="input" type="tel" placeholder="Phone Number" v-model="phone_number">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <p class="title is-5"> Type of Phone</p> 
                <label class="radio">
                  <input type="radio" id="home" name="answer" value="Home" v-model="phone_type">
                  <label for="Home">Home</label>
                </label>
                <label class="radio">
                  <input type="radio" id="cellphone" name="answer" value="Cell" v-model="phone_type">
                  <label for="Cell">Cell</label>
                </label>
                <label class="radio">
                  <input type="radio" id="sms" name="answer" value="Sms" v-model="phone_type">
                  <label for="Sms">Sms</label>
                </label>                
              </div>
            </div>
            <div class="field">
              <div class="control">
                <p class="title is-5"> Email </p>
                <input class="input" type="email" placeholder="Email" v-model="email">
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
        phone_number: "",
        phone_type: "",
        email: "",
        first: "",
        last: ""
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid)
      },
      next() {
        db.collection('users').doc(this.uid)
          .collection('info').doc('contacts').set({
            phone_number: this.phone_number,
            phone_type: this.phone_type,
            email: this.email,
            first_name: this.first,
            last_name: this.last
          }, {merge: true}).then(
          this.$router.push('/application/' + this.uid + "/address_info")
        );  
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          this.email = user.email;

          db.collection('users').doc(user.uid)
            .collection('info').doc('contacts').get()
            .then(snapshot => {
              console.log(snapshot.data())
              this.phone_number = snapshot.data()['phone_number'];
              this.phone_type = snapshot.data()['phone_type'];
              this.last = snapshot.data().last_name;
              this.first = snapshot.data().first_name;
              this.email = snapshot.data().email;
            })
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>