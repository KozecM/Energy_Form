<template>
  <div class="Single Applications">
    <div class="card card-content-background-color-yellow">
      <header class="card-header">
        <p class="card-header-title is-centered">
          Application for {{email}}
        </p>
      </header>
      <div class="card-content">
        <div class="field ">
          <label class="title is-4">Contact Info</label>
          <br />
          <div class="control ">
            <div class="columns">
              <div class="column"></div>
              <div class="column">
                <p class="label is-6" >Name: <span class="notbold">{{user.contacts.first_name}} {{user.contacts.last_name}}</span></p>
                <p class="label is-6" >Email: <span class="notbold">{{user.contacts.email}}</span></p>
                <p class="label is-6" >Phone Number ({{user.contacts.phone_type}}): <span class="notbold">{{user.contacts.phone_number}}</span></p>
                <p class="label is-6" >County: <span class="notbold">{{user.county.county}}</span></p>
              </div>
              <div class="column"></div>
            </div>
            <div class="columns">
              <div class="column"></div>
              <div class="column">
                <div class="columns">
                  <div class="column">
                    <p class="label is-6" >Address:</p>
                    <p>{{user.address.street_address}}</p>
                    <div v-if="user.address.street_address_2 != ''">
                      <p>{{user.address.street_address_2}}</p>
                    </div>
                    <p>{{user.address.city}}</p>
                    <p>{{user.address.state_prov}}</p>
                    <p>{{user.address.postal_zip}}</p>
                  </div>
                  <div v-if="user.mail_address.street_address != ''">
                    <div class="column">
                      <p class="label is-6" >Mailing Address:</p>
                      <p>{{user.mail_address.street_address}}</p>
                      <div v-if="user.mail_address.street_address_2 != ''">
                        <p>{{user.mail_address.street_address_2}}</p>
                      </div>
                      <p>{{user.mail_address.city}}</p>
                      <p>{{user.mail_address.state_prov}}</p>
                      <p>{{user.mail_address.postal_zip}}</p>
                    </div>           
                  </div>
                </div>
              </div>              
              <div class="column"></div>
            </div>
            
          </div>
        </div>
        <hr>
        <div class="field ">
          <label class="title is-4">Household Info</label>
          <br />
          <div class="control is centered">
            <table class="table is-bordered is-striped is-narrow is-centered is-fullwidth">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Birthdate</th>
                  <th>SSN/SSID</th>
                  <th>Gender</th>
                  <th><abbr title="Hispanic">Hisp</abbr></th>
                  <th>Race</th>
                  <th><abbr title="OR Tribe">Tribe</abbr></th>
                  <th>Education</th>
                  <th><abbr title="Diabled">Dis</abbr></th>
                  <th><abbr title="Veteran">Vet</abbr></th>
                  <th><abbr title="HomeBound">HB</abbr></th>
                  <th>SNAP</th>
                  <th>OHP</th>
                  <th><abbr title="Other Medical Insurance">Other Med</abbr></th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(member) in household_members" v-bind:key="member">
                    <td>{{member.first_name}} {{member.last_name}}</td>
                    <td>{{member.birthdate}}</td>
                    <td>{{member.ssn_ssid}}</td>
                    <td>{{member.gender}}</td>
                    <td>{{member.hispanic}}</td>
                    <td>{{member.race}}</td>
                    <td>{{member.or_tribe}}</td>
                    <td>{{member.education}}</td>
                    <td>{{member.disabled}}</td>
                    <td>{{member.veteran}}</td>
                    <td>{{member.homebound}}</td>
                    <td>{{member.snap}}</td>
                    <td>{{member.ohp}}</td>
                    <td>{{member.other_insure}}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr>
        <div class="columns">
          <div class="column"></div>
          <div class="column">
            <div class="field ">
              <label class="title is-4">Residence Info</label>
              <div class="control is centered">
                <p class="label is-6" >Type of Household: <span class="notbold">{{user.household_type.household_type}}</span></p>
                <p class="label is-6" >Type of Dwelling: <span class="notbold">{{user.dwelling_heat.dwelling_type}}</span></p>
                <p class="label is-6" >Residence Status: <span class="notbold">{{user.dwelling_heat.residence_status}}</span></p>
                  
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field ">
              <label class="title is-4">Heat Info</label>
              <div></div>
              <div class="control is centered">
                    <p class="label is-6" >All Heat Types: <span class="notbold" v-for="(heat) in user.dwelling_heat.heat_type" v-bind:key="heat">{{heat}} || </span></p>
                    <p class="label is-6" >Primary Heat: <span class="notbold">{{user.dwelling_heat.primary_heat}}</span></p>
                    <p class="label is-6" >Secondary Heat: <span class="notbold">{{user.dwelling_heat.second_heat}}</span></p>
              </div>
            </div>
          </div>
          <div class="column"></div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">Declaration of Household Income (DHI)</label>
          <br />
          <div class="control is centered">
            <table class="table is-bordered is-striped is-narrow is-centered is-fullwidth">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th><abbr title="Currently in High School">In High Sch</abbr></th>
                  <th>Types of Income</th>
                  <th>Total Income</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(member) in dhi_members" v-bind:key="member">
                    <td>{{member.first_name}} {{member.last_name}}</td>
                    <td>{{member.school}}</td>
                    <td>{{member.income_type}}</td>
                    <td>{{member.income}}</td>
                  </tr>
              </tbody>
            </table>
            <p class="label is-6" >Total Income: <span class="notbold">{{total_income.household_income}}</span></p>
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">More information</label>
          <br />
          <div class="control is centered">
            <div class="columns">
              <div class="column"></div>
              <div class="column">
                <p class="label is-6" >How do you currently pay for your basic necessities? <span class="notbold">{{more_info.basic_necessities}}</span></p>
                <p class="label is-6" >Questions: <span class="notbold">{{more_info.questions}}</span></p>
              </div>
              <div class="column"></div>
            </div>
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">Signature</label>
          <br />
          <div class="control is centered">
            <div class="columns">
              <div class="column"></div>
              <div class="column">
                <p class="title is-6"> I agree to the 
                  <strong><a href="https://www.neighborimpact.org/get-help/help-with-bills/home-energy-assistance/" target="_blank" rel="nofollow">disclaimer</a> </strong>
                  and assert that all the information I have entered is accurate </p>
                <img :src="documents.signature.signature" />
              </div>
              <div class="column"></div>
            </div>
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">Pay Stubs of Household Over 18</label>
          <br />
          <div class="control is centered">
            <div v-for="(url) in documents.paystubs.url" v-bind:key="url.id">
              <img :src="url">
            </div>
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">Electric Bill</label>
          <br />
          <div class="control is centered">
            <img :src="documents.electric.url">
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">Gas Bill</label>
          <br />
          <div class="control is centered">
            <img :src="documents.gas.url">
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">IDs</label>
          <br />
          <div class="control is centered">
            <div v-for="(url) in documents.id.url" v-bind:key="url.id">
              <img :src="url">
            </div>
          </div>
        </div>
        <hr>
        <div class="field">
          <label class="title is-4">Social Security Numbers</label>
          <br />
          <div class="control is centered">
            <div v-for="(url) in documents.ssn.url" v-bind:key="url.id">
              <img :src="url">
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer buttons is-centered">
        <div class="field is-grouped">
          <div class="control">
            <button id="home" v-on:click="home()">Home</button>
            <button id="back" v-on:click="back()">Back</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import firebase from 'firebase'
  import {db, functions} from '../firebase';

  export default {
    props: ['user_id', 'email'],
    data() {
      return {
        uid: "",
        user: {
          address: {},
          contacts: {},
          county: {},
          dwelling_heat: {},
          household_type: {},
          mail_address: {},
        },
        household_members: [],
        dhi_members: [],
        total_income: 0,
        documents: {
          electric: [],
          gas: [],
          id: [],
          paystubs: [],
          ssns: [],
          signature: [],
          agree: []
        },
        more_info: null,
        is_admin: false,
        // signaturePad: VueSignaturePad,
        GetOptions: {
          source: 'cache'
        }
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/check_apps')
      },
    },

    mounted: function() {
      if(this.user_id) {
        var userRef = db.collection('users').doc(this.user_id);
          
        userRef.collection('info').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.user[doc.id] = doc.data();
          })
        })

        userRef.collection('members').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            var id = doc.id
            this.household_members.push(doc.data());
          })
        })

        userRef.collection('dhi').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.dhi_members.push(doc.data());
          })
        })
        userRef.collection('dhi_income').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.total_income = (doc.data());
          })
        })
        userRef.collection('MoreInfo1').doc('info').get().then(snapshot => {
          this.more_info = snapshot.data();
        })

        userRef.collection('documents').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.documents[doc.id] = doc.data();
          })
        })
      }
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
      
    },
  } 
/*eslint-enable*/
</script>

<style scoped>

.notbold{
  font-weight: normal;
}

</style>