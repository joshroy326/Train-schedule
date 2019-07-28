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

var database = firebase.database();

$("#add-train").on("click", function (event) {
    event.preventDefault();


    var train = {
        name: $("#train-name").val().trim(),
        destination: $("#destination").val().trim(),
        firstTrain: $("#first-train").val().trim(),
        frequency: $("#frequency").val().trim(),
    };

    database.ref().push(train);

    
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequncy").val("");
});
database.ref().on("child_added", function (snapshot) {

    var firstTrainTimeConverted = moment(snapshot.val().firstTrain, "HH:mm");
    console.log(firstTrainTimeConverted);

    var currentTime = moment();
    
    var minutesUntilNextTrain = trainFrequency - remainderInTime;
    console.log("MINUTES AWAY: " + minutesUntilNextTrain);

    var differenceTrainTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TRAIN TIME: " + differenceTrainTime);

    var nextTrainArriving = moment().add(minutesUntilNextTrain, "minutes");
    console.log("NEXT ARRIVAL TIME: " + moment(nextTrainArriving).format("HH:mm"));

    var trainFrequency = snapshot.val().frequency;
    var remainderInTime = differenceTrainTime % trainFrequency;
    console.log(remainderInTime);

   

    
    var trainFrequencyElement = $("<td>" + snapshot.val().frequency + "</td>");
    var trainName = $("<td>" + snapshot.val().name + "</td>");
    var minutesAway = $("<td>" + minutesUntilNextTrain + "</td>");
    var nextArrival = $("<td>" + nextTrainArriving.format("HH:mm - 00:00") + "</td>");
    
    var tableRow = $("<tr>");
    
    var trainDestination = $("<td>" + snapshot.val().destination + "</td>");
    
    

    tableRow.append(trainDestination, nextArrival, trainName, minutesAway, trainFrequencyElement);
    $(".table").append(tableRow);

    // Create Error Handling
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

});
