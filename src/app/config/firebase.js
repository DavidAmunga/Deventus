import firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBjiMXnObVdnUlyStYQkP0JSIxVryKfo44",
    authDomain: "deventus-16a2b.firebaseapp.com",
    databaseURL: "https://deventus-16a2b.firebaseio.com",
    projectId: "deventus-16a2b",
    storageBucket: "deventus-16a2b.appspot.com",
    messagingSenderId: "949621103028"
};
firebase.initializeApp(firebaseConfig);
const firestore=firebase.firestore();
const settings={
    timestampsInSnapshots:true
}
firestore.settings(settings);


export default firebase;