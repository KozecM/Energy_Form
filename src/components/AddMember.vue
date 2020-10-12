<template>
  <div class="AddMember">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Add Member
            </p>
          </header>
          <div class="card-content">
            <div class="card-content">
              <div class="field">
                <label class="label is-pulled-left"> Full Name on Social Security Card</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <input class="input" type="text" placeholder="First Name" v-model="member.first_name">
                    </div>
                    <div class="column">
                      <input class="input" type="text" placeholder="Last Name" v-model="member.last_name">
                    </div>
                  </div>                  
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Birth Date</label> 
                <div class="control">
                  <input class="input" type="date" v-model="member.birthdate">
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left"> SSN/SSID</label> 
                <div class="control">
                  <input class="input" type="text" placeholder="SSN/SSID" v-model="member.ssn_ssid" @keypress="isNum($event)">
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Gender</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Male" name="gender" value="Male" v-model="member.gender">
                        Male
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Female" name="gender" value="Female" v-model="member.gender">
                        Female
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Other" name="gender" value="Other" v-model="member.gender">
                        Other
                      </label> 
                    </div>
                  </div>            
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Hispanic/Latino?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="yes_latino" name="latino" value=true v-model="member.hispanic">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="no_latino" name="latino" value=false v-model="member.hispanic">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Race/Ethnicity</label> 
                <p class="control">
                  <span class="select">
                    <select v-model="member.race">
                      <option value="AI-American Indian">AI-American Indian</option>
                      <option value="A-Asian">A-Asian</option>
                      <option value="B-Black">B-Black</option>
                      <option value="H-Hispanic/Latino">H-Hispanic/Latino</option>
                      <option value="N-Native Hawaiian">N-Native Hawaiian</option>
                      <option value="W-White/Caucasian">W-White</option>
                    </select>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Oregon tribal member?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="yes_tribe" name="tribe" value=true v-model="member.or_tribe">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="no_tribe" name="tribe" value=false v-model="member.or_tribe">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Highest level of education recieved</label> 
                <p class="control">
                  <span class="select">
                    <select v-model="member.education">
                      <option value="No schooling completed">No schooling completed</option>
                      <option value="Nursery school to 8th grade">Nursery Sch. to 8th grade</option>
                      <option value="Some high school, no diploma">Some High Sch, no diploma</option>
                      <option value="High school graduate, diploma or the equivalent">High Sch. diploma or GED</option>
                      <option value="Some college credit, no degree">Some college credit, no degree</option>
                      <option value="Trade/technical/vocational training">Trade/tech/vocational training</option>
                      <option value="Associate degree">Associate degree</option>
                      <option value="Batchelor's degree">Batchelor's degree</option>
                      <option value="Master's degree">Master's degree</option>
                      <option value="Professional degree">Professional degree</option>
                      <option value="Doctorate degree">Doctorate degree</option>
                    </select>
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Disabled</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Yes" name="disabled" value='yes' v-model="member.disabled">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="No" name="disabled" value='no' v-model="member.disabled">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Veteran?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Yes" name="veteran" value='Yes' v-model="member.veteran">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="No" name="veteran" value='No' v-model="member.veteran">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Homebound?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Yes" name="homebound" value='Yes' v-model="member.homebound">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="No" name="homebound" value='No' v-model="member.homebound">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Receiving SNAP?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Yes" name="snap" value='Yes' v-model="member.snap">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="No" name="snap" value='No' v-model="member.snap">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">On the Oregon Health Plan (OHP)?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Yes" name="ohp" value='Yes' v-model="member.ohp">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="No" name="ohp" value='No' v-model="member.ohp">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Have other Medical Insurance?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="Yes" name="other" value='Yes' v-model="member.other_insure">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="No" name="other" value='No' v-model="member.other_insure">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
          <footer class="card-footer buttons is-centered">
            <div class="control"> 
              <button id="back" v-on:click="back()">Home</button>
              <button id="add" v-on:click="add()">Add Member</button>
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
    props: ['first_name', 'last_name'],
    data() {
      return {
        uid: "",
        county: "",
        full_name:"",
        member:  {
          first_name: "",
          last_name: "",
          birthdate: "",
          ssn_ssid: "",
          gender: "",
          hispanic: null,
          race: "",
          or_tribe: null,
          education: "",
          disabled: null,
          veteran: null,
          homebound: null,
          snap: null,
          ohp: null,
          other_insure: null
        }
      }
    },

    methods: {
      back() {
        this.$router.push('/dashboard')
      },

      add() {
        this.full_name = this.member['first_name'] + " " + this.member['last_name']
        console.log("adding member: ", this.full_name)
        db.collection('users').doc(this.uid)
          .collection('members').doc(this.full_name).set(
            this.member,
            {merge: true}
          ).then(
            this.$router.push({path: '/application/' + this.uid + "/household_info"})
          );
      },

      isNum: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
          evt.preventDefault();;
        } else {
          return true;
        }
      }
    },

    mounted: function () {
      if(this.first_name) {
        console.log("name exists!")
        this.full_name = this.first_name + " " + this.last_name;
      }
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          console.log("Name: ", this.full_name);
          if(this.full_name){
            db.collection('users').doc(this.uid)
            .collection('members').doc(this.full_name).get().then(querySnapshot => {
              console.log(querySnapshot.data())
              this.member.first_name = querySnapshot.data().first_name,
              this.member.last_name = querySnapshot.data().last_name,
              this.member.birthdate = querySnapshot.data().birthdate,
              this.member.ssn_ssid = querySnapshot.data().ssn_ssid,
              this.member.gender = querySnapshot.data().gender,
              this.member.hispanic = querySnapshot.data().hispanic,
              this.member.race = querySnapshot.data().race,
              this.member.or_tribe = querySnapshot.data().or_tribe,
              this.member.education = querySnapshot.data().education,
              this.member.disabled = querySnapshot.data().disabled,
              this.member.veteran = querySnapshot.data().veteran,
              this.member.homebound = querySnapshot.data().homebound,
              this.member.snap = querySnapshot.data().snap,
              this.member.ohp = querySnapshot.data().ohp,
              this.member.other_insure = querySnapshot.data().other_insure
            });
          }
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>