# electrical_assistance

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### uploading to firebase
first login to firebase using the username a password you are given
```
firebase login
```
then initialize firebase
```
firebase init
```
In the initilization make sure you select hosting and make the public directory dist which is created when you use npm run build
do not cinfigure as a single page app or overwrite any of the files.

Finally deploy the project
```
firebase deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
