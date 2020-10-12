<template>
  <div class="AddMember">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Dwelling and Heat Type
            </p>
          </header>
          <div class="card-content">
            <div class="card-content">
              <div class="field">
                <label class="label is-pulled-left"> Type of Dwelling</label> 
                <p class="control">
                  <span class="select">
                    <select v-model="dwelling_type">
                      <option value="H Single Family House">Single Family House</option>
                      <option value="M Multi-Unit (2-4)">Multi-Unit (2-4)</option>
                      <option value="U Milti-Unit (Over 4)">Milti-Unit (Over 4)</option>
                      <option value="A Manufactured/Mobile Home">Manufactured/Mobile Home</option>
                      <option value="E Hotel/Motel">Hotel/Motel</option>
                      <option value="T Travel Trailer">Travel Trailer</option>
                      <option value="R Other">Other</option>
                    </select>
                  </span>
                </p>
              </div>
              <div class="field ">
                <label class="label is-pulled-left"> Residence Status</label> 
                <p class="control">
                  <span class="select">
                    <select v-model="residence_stat">
                      <option value="R Rent (Heat not included)">R Rent (Heat not included)</option>
                      <option value="E Rent (Heat included)">Rent (Heat included)</option>
                      <option value="S HUD or Section 8 (Heat not included)">HUD or Section 8 (Heat not included)</option>
                      <option value="O Own">Own</option>
                    </select>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Type of Heat (select all that apply)</label>
                <div class="columns">
                  <div class="column ">
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Electric" name="answer" value="E Electric" v-model="heat_type">
                      <label for="Electric"> Electric</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Oil" name="answer" value="O Oil" v-model="heat_type">
                      <label for="Oil"> Oil</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Wood" name="answer" value="W Wood" v-model="heat_type">
                      <label for="Wood"> Wood</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Solar" name="answer" value="S Solar" v-model="heat_type">
                      <label for="Solar"> Solar</label>
                    </label>
                  </div>
                  <div class="column">
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Natural_Gas" name="answer" value="N Natural Gas" v-model="heat_type">
                      <label for="Natural_Gas"> Natural Gas</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Propane" name="answer" value="L  Propane" v-model="heat_type">
                      <label for="Propane">  Propane</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Pellets" name="answer" value="P Pellets" v-model="heat_type">
                      <label for="Pellets"> Pellets</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Other" name="answer" value="T Other" v-model="heat_type">
                      <label for="Other"> Other</label>
                    </label>
                  </div>
                </div>
              </div>
              <div class="field ">
                <label class="label is-pulled-left"> Which is the primary heat source?</label> 
                <p class="control">
                  <span class="select">
                    <select v-model="primary_heat">
                      <option value="E Electric">Electric</option>
                      <option value="O Oil">Oil</option>
                      <option value="W Wood">Wood</option>
                      <option value="S Solar">Solar</option>
                      <option value="N Natural Gas">Natural Gas</option>
                      <option value="L Propane">Propane</option>
                      <option value="P Pellets">Pellets</option>
                      <option value="T Other">Other</option>
                    </select>
                  </span>
                </p>
              </div>
              <div class="field ">
                <label class="label is-pulled-left"> Which is the secondary heat source?</label> 
                <p class="control">
                  <span class="select">
                    <select v-model="second_heat">
                      <option value="E Electric">Electric</option>
                      <option value="O Oil">Oil</option>
                      <option value="W Wood">Wood</option>
                      <option value="S Solar">Solar</option>
                      <option value="N Natural Gas">Natural Gas</option>
                      <option value="L Propane">Propane</option>
                      <option value="P Pellets">Pellets</option>
                      <option value="T Other">Other</option>
                    </select>
                  </span>
                </p>
              </div>
            </div>
          </div>  
          <footer class="card-footer buttons is-centered">
            <div class="control"> 
              <button id="home" v-on:click="home()">Home</button>
              <button id="back" v-on:click="back()">Back</button>
              <button id="add" v-on:click="next()">Next</button>
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
        dwelling_type: "",
        residence_stat: "",
        heat_type: [],
        primary_heat: "",
        second_heat: ""
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid +'/household_type')
      },
      next() {
        db.collection('users').doc(this.uid)
          .collection('info').doc('dwelling_heat').set({
            dwelling_type: this.dwelling_type,
            residence_status: this.residence_stat,
            heat_type: this.heat_type,
            primary_heat: this.primary_heat,
            second_heat: this.second_heat
        }).then(
          this.$router.push('/application/' + this.uid + "/household_info")
        );
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;

          db.collection('users').doc(user.uid)
            .collection('info').doc('dwelling_heat').get()
            .then(snapshot => {
              console.log(snapshot.data())
              this.dwelling_type = snapshot.data()['dwelling_type']
              this.residence_stat = snapshot.data()['residence_status']
              this.heat_type = snapshot.data()['heat_type']
              this.primary_heat = snapshot.data()['primary_heat']
              this.second_heat = snapshot.data()['second_heat']
              
            })
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>