import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAK4IkXEg6Z4lfLkxmkO4bFrB5Mbxlc-l4",
  authDomain: "tenedores-a09a4.firebaseapp.com",
  databaseURL: "https://tenedores-a09a4.firebaseio.com",
  projectId: "tenedores-a09a4",
  storageBucket: "tenedores-a09a4.appspot.com",
  messagingSenderId: "254789825352",
  appId: "1:254789825352:web:7b7f9f5983deb4eb34b97d"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
