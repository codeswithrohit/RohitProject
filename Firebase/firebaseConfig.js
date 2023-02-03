import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    //Paste Your firebase config here
   
      apiKey: "AIzaSyBJv58MsSXNnalGohZgRrWsXZshyVPkCyg",
      authDomain: "foodapp-37836.firebaseapp.com",
      projectId: "foodapp-37836",
      storageBucket: "foodapp-37836.appspot.com",
      messagingSenderId: "357168478863",
      appId: "1:357168478863:web:c892a5eca8703a19c98efa"
    
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }