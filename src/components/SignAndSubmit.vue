<template>
  <div class="Required Documents">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p v-if="errors">
          <b class="has-text-danger">Must accept the disclaimer to continue</b>
        </p>
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p>{{count}}</p>
            <p class="card-header-title is-centered">
              Sign and Submit
            </p>
          </header>
          <div class="card-content">
            <div class="field">
              <div class="control">
                <p class="title is-6"> I agree to the 
                  <strong><a href="https://www.neighborimpact.org/get-help/help-with-bills/home-energy-assistance/" target="_blank" rel="nofollow">disclaimer</a> </strong>
                  and assert that all the information I have entered is accurate </p>
                <div class="columns">
                  <div class="column">
                    <label class="radio">
                      <input type="radio" id="Yes" name="other" value=true v-model="agree">
                      Yes
                    </label>
                  </div>
                  <div class="column">
                    <label class="radio">
                      <input type="radio" id="No" name="other" value=false v-model="agree">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div class="control">
                <p class="title is-5"> Sign Here</p>
                <div class="box">
                  <VueSignaturePad ref="signaturePad" :w="'800px'" :h="'400px'" :customStyle="option" />
                </div>
                <button v-on:click="undo">Undo</button>
              </div>
            </div>              
          </div>
          <footer class="card-footer buttons is-centered">
            <div class="control">
              <button id="home" v-on:click="home()">Home</button>
              <button id="back" v-on:click="back()">Back</button>
              <button id="submit" v-on:click="submit()">Submit</button>
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
        count: 10,
        errors: false,
        option:{
          border: "black 3px solid"
        },
        signaturePad: VueSignaturePad,
        agree: false,

      }
    },
    computed: {
      gridStyle() {
        return {
          gridTemplateColumns: `repeat(${this.numberOCols}, minmax(200px, 1fr))`
        }
      },
    },
    methods: {
      undo() {
      this.$refs.signaturePad.undoSignature();
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        var storRef = firebase.storage().ref('images/'+ this.uid + '/signature');
        var task = storRef.put(data)

        task.on('state_changed',
          snapshot => {
            var percent = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            this.uploadValue = percent;
          },
          function error(err) {
            console.log(err);
          },
          ()=>{this.uploadValue =100;
            task.snapshot.ref.getDownloadURL().then((url) => {
              console.log("url: " + url);
              this.bills.push(url);
              db.collection('users').doc(this.uid)
                .collection('documents').doc(title)
                .collection('imageUrls').add({
                url: url
              }).then(snapshot => {
              }); 
            })
          }
        );  
      },
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid + "/required_docs_3")
      },
      submit() {

        if(this.agree === "false"){
          console.log("Agree:", this.agree)
          this.errors = true;
        } else{
          const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
          console.log(isEmpty);
          console.log("agree: ", this.agree);

          db.collection('users').doc(this.uid)
            .collection('documents').doc('signature').set({
              signature: data,
              agree: this.agree
            }).then(
              this.$router.push('/dashboard')
            )
        }
        
      },
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;

        //   db.collection('users').doc(user.uid)
        //     .collection('documents').doc('paystubs')
        //     .collection('imageUrls').get()
        //     .then(snapshot => {
        //       console.log("snapshot: ", snapshot.docs)
        //       snapshot.docs.forEach(element => {
        //         console.log("element" + element.data().url);
        //         this.paystubs.push(element.data().url);
        //       });
        // });
        }else{
          this.$router.push('/');
        }
      })
    },
  }
/*eslint-enable*/
</script>
<style scoped>
  .inputfile{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    
  }
</style>