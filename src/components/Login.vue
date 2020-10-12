<template>
  <div class="main_page">
    <h1 class="is-centered"><b>NeighborImpact Energy Assistance Form</b></h1>
    <br />
    <h2>Please use email and password to login</h2>
    <div class= "email_pass">
      
      <input type="email" id="email" v-model="email" placeholder="Email">
      <input type="password" id="password" v-model="password" placeholder="Password">
    </div>
    <br />
    <div class="buttons">
    </div>
    <div class="buttons">
      <button class="button is-pulled-left is-link" id="login" v-on:click="logIn">Log In</button>
      <button class="button is-light" id="forgot" @click="forgot">Forgot Password?</button>
      
    </div>
    <div class="buttons">
      <img src="../../public/google_signin.png" alt="Google Sign In" class="image" v-on:click="googleClick">
    </div>
    <div class="buttons">
      <button class="button is-medium is-link " id="signup" v-on:click="signUp">Sign Up</button>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import * as firebase from 'firebase';
// import router from '../routes'

export default {

  data() {
    return{
      email: "",
      password: ""
    };
  },

  methods: {

    signUp: function () {
      this.$router.push('CreateUser');
    },

    forgot: function () {
      this.$router.push('ForgotPassword');
    },

    googleClick:function () {
      var googleProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(
        googleProvider).then(data => {
          this.$router.push('Dashboard', data.user.uid);
        })
        .catch(function(error) {
          alert("error!" + error.message)
        });
    },

    logIn: function () {
      firebase.auth().signInWithEmailAndPassword(
        this.email,this.password)
        .then(data => {
          if(data.user.emailVerified){
            this.$router.push('Dashboard', data.user.uid);
          }
        })
        .catch(function(error) {
          alert("error!" + error.message)
        });
    }
  },

  mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.$router.push('/Dashboard')
        }
        else if(user && !user.emailVerified){
          alert("Your email is not verified, please check email for verification link");
          firebase.auth().signOut();
        }
      })
    },

}


/*eslint -enable*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main_page {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 2cm;
  border-radius: 25px;
  transform: translate(-50%, -50%);
  background-color: #FED02A;
  
}
input {
  margin: 5px;
  padding: 10px;
}

button {
  display: inline-block;
  border: 3px solid white;
  padding: 6px 19px;
  margin:0 5px 5px 0;
  border-radius: 2px;
  box-sizing: border-box;
  text-decoration: none;
  color:black;
  text-align: center;
  background-color: transparent;
  transition: all 0.3s;
}

button:hover{
  color: black;
  background-color: white;
}

#googleLogin {
  color:black;
  border:3px solid white;
}

#googleLogin:hover {
  color: black;
  background-color: white;
}

@media all and (max-width: 480px){
  button{
    display: block;
    margin: 7px auto;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
