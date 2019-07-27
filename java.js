var firebaseConfig = {
    apiKey: "AIzaSyBE6ClCe3asf8WcCZ__b-3ElmbyKGC0Ado",
    authDomain: "train-hw-b5b02.firebaseapp.com",
    databaseURL: "https://train-hw-b5b02.firebaseio.com",
    projectId: "train-hw-b5b02",
    storageBucket: "",
    messagingSenderId: "176199939288",
    appId: "1:176199939288:web:a8326384c79daffe"
};

firebase.initializeApp(firebaseConfig);
// alert("hi");


$("#add-train").on("click", function (event) {
    event.preventDefault();


    var train = {
        name: $("#train-name").val().trim(),
        destination: $("#destination").val().trim(),
        firstTrain: $("#first-train").val().trim(),
        frequency: $("#frequency").val().trim(),
    };

    database.ref().push(train);

    //clear inputs 
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
});