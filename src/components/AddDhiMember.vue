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
                <label class="label is-pulled-left"> Name of Household member</label> 
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
                <label class="label is-pulled-left">Currently in High School?</label> 
                <div class="control">
                  <div class="columns">
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="yes_school" name="school" value=true v-model="member.school">
                        Yes
                      </label>
                    </div>
                    <div class="column">
                      <label class="radio">
                        <input type="radio" id="no_school" name="school" value=false v-model="member.school">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Types of Income (Select all that apply)</label> 
                <div class="columns">
                  <div class="column">
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Salary" name="answer" value="Salary" v-model="member.income_type">
                      <label for="Salary "> Salary</label>
                    </label> 
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Spousal_Support" name="answer" value="Spousal Support" v-model="member.income_type">
                      <label for="Spousal_Support"> Spousal Support</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Child_Support" name="answer" value="Child Support" v-model="member.income_type">
                      <label for="Child_Support"> Child Support</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Informal_Income" name="answer" value="Informal Income" v-model="member.income_type">
                      <label for="Informal_Income"> Informal Income</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Cash_Family" name="answer" value="Cash from Family" v-model="member.income_type">
                      <label for="Cash_Family"> Cash from Family</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="SSI" name="answer" value="" v-model="member.income_type">
                      <label for="SSI"> SSI</label>
                    </label>
                  </div>
                  <div class="column">
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Informal_Child" name="answer" value="Informal child support" v-model="member.income_type">
                      <label for="Informal_Child"> Informal child support</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Can_deposits" name="answer" value="Can deposits" v-model="member.income_type">
                      <label for="Can_deposits"> Can deposits</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Informal_Spousal" name="answer" value="Informal spousal support" v-model="member.income_type">
                      <label for="Informal_Spousal"> Informal spousal support</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Occasional_Work" name="answer" value="Occasional work for cash" v-model="member.income_type">
                      <label for="Occasional_Work"> Occasional work for cash</label>
                    </label>
                    <br />
                    <label class="checkbox is-pulled-left">
                      <input type="checkbox" id="Rental_Income" name="answer" value="Rental income" v-model="member.income_type">
                      <label for="Rental_Income"> Rental income</label>
                    </label>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label is-pulled-left">Total Income Received</label> 
                <p class="control has-icons-left">
                  <input class="input" type="number" v-model="member.income">
                  <span class="icon is-small is-left">
                    <i class="$">$</i>
                  </span>
                </p>
              </div>
            </div>
          </div>  
          <footer class="card-footer buttons is-centered">
            <div class="control"> 
              <button id="home" v-on:click="home()">Home</button>
              <button id="back" v-on:click="back()">Back</button>
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
          school: false,
          income_type: [], 
          income: 0,
        }
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },

      back() {
        this.$router.push('/application/' + this.uid + "/dhi")
      },

      add() {
        this.full_name = this.member['first_name'] + " " + this.member['last_name']
        console.log("adding member: ", this.full_name)
        db.collection('users').doc(this.uid)
          .collection('dhi').doc(this.full_name).set(
            this.member
          ).then(
            this.$router.push('/application/' + this.uid + "/dhi")
          );
      }
    },

    mounted: function () {
      if(this.first_name) {
        this.full_name = this.first_name + " " + this.last_name;
      }
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          if(this.full_name){
            db.collection('users').doc(this.uid)
            .collection('dhi').doc(this.full_name).get().then(querySnapshot => {
              console.log(querySnapshot.data())
              this.member.first_name = querySnapshot.data().first_name,
              this.member.last_name = querySnapshot.data().last_name,
              this.member.school = querySnapshot.data().school,
              this.member.income_type = querySnapshot.data().income_type,
              this.member.income = querySnapshot.data().income
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