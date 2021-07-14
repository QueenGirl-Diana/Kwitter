//YOUR FIREBASE LINKS
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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code 
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like']
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + " onclick='updateLike(this.id)'>"
                span_with_tag = "<span class='glypicon glyphucon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code 
            }
        });
    });
}
getData()

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likesikes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}