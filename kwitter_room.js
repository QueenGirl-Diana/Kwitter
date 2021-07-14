var firebaseConfig = {
    apiKey: "AIzaSyC_8PHdqNo__2wb2gc-__h-UmQ-xuxaZ6c",
    authDomain: "kwitter-5e5c5.firebaseapp.com",
    databaseURL: "https://kwitter-5e5c5-default-rtdb.firebaseio.com",
    projectId: "kwitter-5e5c5",
    storageBucket: "kwitter-5e5c5.appspot.com",
    messagingSenderId: "551274451341",
    appId: "1:551274451341:web:123ee3ddd3d10895bdadc4",
    measurementId: "G-ZCMFFHRXMK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    })

    localStorage.setItem("room_name", room_name)

    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //start code
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}