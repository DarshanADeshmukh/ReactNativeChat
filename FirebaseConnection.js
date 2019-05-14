import firebase from 'firebase';

class FirebaseConnection {
  constructor() {
    this.init();
    this.observeAuth();
  }
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
          try {
            firebase.auth().signInAnonymously();
          } catch ({ message }) {
            alert(message);
          }
        }
      };

  init = () =>
      firebase.initializeApp({
        apiKey: "AIzaSyDw_CPQz3hEXYTdszYF9scydYYVbLoriyo",
        authDomain: "reactchatapp-90f8b.firebaseapp.com",
        databaseURL: "https://reactchatapp-90f8b.firebaseio.com",
        projectId: "reactchatapp-90f8b",
        storageBucket: "reactchatapp-90f8b.appspot.com",
        messagingSenderId: "907919170409",
        appId: "1:907919170409:web:b99c5489c673ae4b",
      });

      get ref() {
        return firebase.database().ref('messages');
      }

      on = callback =>
          this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));


      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
          _id,
          timestamp,
          text,
          user,
        };
        return message;
      };

      get uid() {
        return (firebase.auth().currentUser || {}).uid;
      }

      get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
      }

      send = messages => {
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];
          const message = {
            text,
            user,
            timestamp: this.timestamp,
    };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

      off() {
        this.ref.off();
      }
}
FirebaseConnection.shared = new FirebaseConnection();
export default FirebaseConnection;
