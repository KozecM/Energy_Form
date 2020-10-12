<template>
  <div class="Required Documents">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="card card-content-background-color-yellow">
          <header class="card-header">
            <p class="card-header-title is-centered">
              Required Documents (Paystubs)
            </p>
          </header>
          <div class="card-content">
            <div class="field">
              <div class="control">
                <p class="title is-5"> Pay stubs for household members 18 and over</p>
                <div class="add_pic">
                  <input type="file" multiple @change="onFileChosen" ref="paystub" class="inputfile"> 
                  <button @click="$refs.paystub.click()" >Choose Files</button>
                </div>
                <div v-if="imagesData!= null">
                  <button id="upload" v-on:click="onUpload('paystubs')">Upload</button>
                </div>                
                <div class="tile is-ancestor"  v-for="(i) in Math.ceil(paystubs.length / 3)" v-bind:key="i.id">
                  <div class="tile is-parent is-4" v-for="picture in paystubs.slice((i-1)*3, i*3)" v-bind:key="picture.id">
                    <article class="tile is-child">
                      <figure class="image is-1by1">
                        <img :src="picture">
                      </figure>
                    </article>
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
        paystubs: [],
        uploadValue: 0,
        imagesData: null,
        count: 0
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
      home() {
        this.$router.push('/dashboard')
      },
      back() {
        this.$router.push('/application/' + this.uid + "/more_info_1")
      },
      next() {
          this.$router.push('/application/' + this.uid + "/required_docs_2") 
      },
      onFileChosen(event) {
        this.uploadValue=0;
        this.imagesData = event.target.files;
      },
      onUpload(title) {
        this.imagesData.forEach(image => {
          var storRef = firebase.storage().ref('images/'+ this.uid + '/' + title + `/${image.name}`);
          var task = storRef.put(image);
          console.log(task.snapshot.ref)
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
                this.paystubs.push(url);
                db.collection('users').doc(this.uid)
                  .collection('documents').doc(title)
                  .set({
                  url: this.paystubs
                }).then(snapshot => {
                }); 
              })
            }
          ); 
        });
        this.imagesData = null;
      },
      change: function() {
        this.editVal = true;
      },
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user && user.emailVerified){
          this.uid = user.uid;
          console.log("Hello")

          db.collection('users').doc(user.uid)
            .collection('documents').doc('paystubs')
            .get()
            .then(snapshot => {
              console.log("snapshot: ", snapshot.docs)
              this.paystubs = snapshot.data().url
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

  .inputfile{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    
  }
</style>