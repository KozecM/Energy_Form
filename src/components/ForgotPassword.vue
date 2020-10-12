<template>
  <div class="forgot_pqassword">
    <h1><b>Forgot Password?</b></h1>
    <br />
    <h2> Please input your email so we can send you a recovery link</h2>
    <div class= "email">
      <label for="email"> Email: </label>
      <input type="email" id="email" v-model="email" placeholder="Email">
    </div>
    <br />
    <div class="columns">
      <div class="column is-centered">
        <button id="send_email" v-on:click="recover">Send Recovery Email</button>
        <button id="back" v-on:click="back">Back</button>
      </div>
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
    };
  },

  methods: {

    recover: function () {
      console.log(this.email);
      firebase.auth().sendPasswordResetEmail(this.email).then( res => {
        this.$router.push('EmailSent');
      })
      
    },
    back: function() {
      this.$router.push('/')
    }
  },

  mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.$router.push('/Dashboard')
        }
      })
    },

}


/*eslint -enable*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.forgot_pqassword {
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
