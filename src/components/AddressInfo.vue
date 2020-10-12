<template>
  <div class="AddressInfo ">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p v-if="errors.length > 0">
          <b>Missing following fields</b>
        </p>  
        <p v-for="(error) in errors" v-bind:key="error"> {{error}} </p>
        <div class="card card-content background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Address Info
            </p>
          </header>
          <div class="card-content">
            <p class="title is-5"> Physical Address </p>
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Street Address" v-model="physical_address.street_address">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Street Address Line 2" v-model="physical_address.street_address_2">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="columns">
                  <div class="column">
                    <input class="input" type="text" placeholder="City" v-model="physical_address.city">
                  </div>
                  <div class="column">
                    <input class="input" type="text" placeholder="State/Province" v-model="physical_address.state_prov">
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="columns">
                  <div class="column is-half">
                    <input class="input" type="text" placeholder="Postal/Zip" v-model="physical_address.postal_zip">
                  </div>
                </div>
              </div>
            </div>
            <p class="title is-5"> Is your physical address different from your mailing address? </p>
            <div class="field">
              <div class="control radio is-centered">
                <label class="radio">
                  <input type="radio" name="answer" v-model="has_mail" value="true">
                  Yes
                </label>
                <label class="radio">
                  <input type="radio" name="answer" v-model="has_mail" value="false">
                  No
                </label>
              </div>
            </div>
            <div v-if="has_mail == 'true'">
              <p class="title is-5"> Mailing Address </p>
              <div class="field">
                <div class="control">
                  <input class="input" type="text" placeholder="Street Address" v-model="mail_address.street_address">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="text" placeholder="Street Address Line 2" v-model="mail_address.street_address_2">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <input class="input" type="text" placeholder="City" v-model="mail_address.city">
                    </div>
                    <div class="column">
                      <input class="input" type="text" placeholder="State/Province" v-model="mail_address.state_prov">
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="columns">
                    <div class="column is-half">
                      <input class="input" type="text" placeholder="Postal/Zip" v-model="mail_address.postal_zip">
                    </div>
                  </div>
                </div>
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
        physical_address: {
          street_address: "",
          street_address_2: "",
          city: "",
          state_prov: "",
          postal_zip: "",
        },
        mail_address: {
          street_address: "",
          street_address_2: "",
          city: "",
          state_prov: "",
          postal_zip: "",
        },
        has_mail: false,
        errors: [],
        all_filled: true
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid +'/contact_info')
      },
      next() {
        console.log("adding address: ", this.physical_address)
        for(var key in this.physical_address) {
          if(this.physical_address[key] === "" && String(key) != "street_address_2") {
            console.log(key + " is blank and must be filled");
            this.all_filled = false;
            this.errors.push(key)
          }
        }
        if(this.all_filled){
          db.collection('users').doc(this.uid)
            .collection('info').doc('address').set({
              street_address: this.physical_address.street_address,
              street_address_2: this.physical_address.street_address_2,
              city: this.physical_address.city,
              state_prov: this.physical_address.state_prov,
              postal_zip: this.physical_address.postal_zip,
          }, {merge: true}).then(this.checkmail()); 
        }
        
      },
      checkmail() {
        if(this.has_mail){
            db.collection('users').doc(this.uid)
              .collection('info').doc('mail_address').set({
                street_address: this.mail_address.street_address,
                street_address_2: this.mail_address.street_address_2,
                city: this.mail_address.city,
                state_prov: this.mail_address.state_prov,
                postal_zip: this.mail_address.postal_zip,
              }, {merge: true}).then(
                this.$router.push('/application/' + this.uid + "/household_type"),
              );
          }
          else{
            this.$router.push('/application/' + this.uid + "/household_type")
          }
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          db.collection('users').doc(user.uid)
            .collection('info').doc('address').get()
            .then(snapshot => {
              this.physical_address.street_address = snapshot.data()['street_address']
              this.physical_address.street_address_2 = snapshot.data()['street_address_2']
              this.physical_address.city = snapshot.data()['city']
              this.physical_address.state_prov = snapshot.data()['state_prov']
              this.physical_address.postal_zip = snapshot.data()['postal_zip']
            });s
          
          db.collection('users').doc(user.uid)
            .collection('info').doc('mail_address').get()
            .then(snapshot => {
              if(snapshot.data() != null){
                this.mail_address.street_address = snapshot.data()['street_address']
                this.mail_address.street_address_2 = snapshot.data()['street_address_2']
                this.mail_address.city = snapshot.data()['city']
                this.mail_address.state_prov = snapshot.data()['state_prov']
                this.mail_address.postal_zip = snapshot.data()['postal_zip']
              }
              
            });
          
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>

<style scoped>
  #card-content{
    background-color: #FED02A
  }
</style>