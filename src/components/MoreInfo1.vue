<template>
  <div class="More Info 1">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              More Information
            </p>
          </header>
          <div class="card-content">
            <div class="field">
              <div class="control">
                <p class="title is-5"> How do you currently pay for your basic necessities (rent, food, phone, etc.)?</p>
                <textarea class="textarea" placeholder="input here" v-model="basic_necessities"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <p class="title is-5"> Type a question</p> 
                <textarea class="textarea" placeholder="input here" v-model="questions"></textarea>
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
        basic_necessities: "",
        questions: "",
      }
    },

    methods: {
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid + "/dhi")
      },
      next() {
        db.collection('users').doc(this.uid)
          .collection('MoreInfo1').doc('info').set({
            basic_necessities: this.basic_necessities,
            questions: this.questions
        }).then(
          this.$router.push('/application/' + this.uid + "/required_docs")
        );  
      }
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          db.collection('users').doc(this.uid)
            .collection('MoreInfo1').doc('info').get()
            .then(snapshot => {
              this.basic_necessities = snapshot.data().basic_necessities;
              this.questions = snapshot.data().questions
            })
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>