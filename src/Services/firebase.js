import firebase from 'firebase';

const firebaseConfig = {
    //You need to paste here the configurations that firebase gives you when you create the DataBase 
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth, provider};
  export default db;
