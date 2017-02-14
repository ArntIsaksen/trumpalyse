// Initialize Firebase

function firebaseConnection() {

    this.config = {
        apiKey: "AIzaSyCL7TGM5z24pEt4uSC9pZsuE6u8ORK-79M",
        authDomain: "trumpalyse.firebaseapp.com",
        databaseURL: "https://trumpalyse.firebaseio.com",
        storageBucket: "trumpalyse.appspot.com",
        messagingSenderId: "751252707175"
    };
    firebase.initializeApp(this.config);

    this.database = firebase.database();

    this.writeToDb = (path, data) => {
        this.database.ref(path).set(data);
    }

    this.readFromDb = (path) => {
        return this.database.ref(path).once("value").then((snapshot) => {
            return snapshot.val();
        });
    }
}