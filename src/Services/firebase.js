import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBK6_UnRIL_A2i3IjWRPCCns_3yWR6XuHA",
    authDomain: "whatsapp-clone-16a51.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-16a51.firebaseio.com",
    projectId: "whatsapp-clone-16a51",
    storageBucket: "whatsapp-clone-16a51.appspot.com",
    messagingSenderId: "80532423050",
    appId: "1:80532423050:web:d2f11ae82c9906e7dc4873",
    measurementId: "G-8D5GNCQEQD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth, provider};
  export default db;