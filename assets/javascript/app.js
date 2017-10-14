// Initialize Firebase
var config = {
    apiKey: "AIzaSyC6BPVcgpXGVLktW_pktRvl4PO82IcERo0",
    authDomain: "train-schedule-f5b16.firebaseapp.com",
    databaseURL: "https://train-schedule-f5b16.firebaseio.com",
    projectId: "train-schedule-f5b16",
    storageBucket: "train-schedule-f5b16.appspot.com",
    messagingSenderId: "644137175065"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// function Train(name, destination, trainStart, frequency) {
//     this.name = name;
//     this.destination = destination;
//     this.trainStart = trainStart;
//     this.frequency = frequency;
// }
$("button").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#trainStart-input").val().trim(), "HH:mm").format("HH:mm a");
    var frequency = $("#frequency-input").val().trim();

    //create local temporary object for holding train data
    database.ref().push({
        name: trainName,
        destination: destination,
        start: trainStart,
        frequency: frequency,

    });
    // var newTrain =  new Train(name, destination, trainStart, frequency);

    //upload train data to database
    // database.ref().push(newTrain);

    //log data to console
    console.log("Name =" + name);
    console.log("end =" + destination);
    console.log("start =" + trainStart);
    console.log("frequency =" + frequency);

    //Clear text boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //Store everything into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(frequency);
    //math
    var trainStartConverted = moment(trainStart, "hh:mm").subtract(1, "years");
    console.log(trainStartConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment(currentTime).diff(moment(trainStartConverted), "minutes");
    console.log("Difference in time=" + diffTime);

    var remainder = diffTime % frequency;
    console.log(remainder);

    //Minutes til next train
    var minutes = frequency - remainder;
    console.log(minutes);

    // Next Train
    var nextTrain = moment(currentTime).add(minutes, "minutes")
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#tbody").append("<tr class = 'tablerow'><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td></tr>");

})