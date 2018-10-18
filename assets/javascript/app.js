$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC2Fk1Jsia8k_IUeTvmFs9NeQYmdHpvc4A",
        authDomain: "justintrainproject.firebaseapp.com",
        databaseURL: "https://justintrainproject.firebaseio.com",
        projectId: "justintrainproject",
        storageBucket: "justintrainproject.appspot.com",
        messagingSenderId: "647189337136"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //Button Action for adding Trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
        var trainFreq = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            role: trainDestination,
            start: trainTime,
            rate: trainFreq
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.role);
        console.log(newTrain.start);
        console.log(newTrain.rate);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().role;
        var trainTime = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().rate;

        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFreq);

        // Prettify the train start
        var trainTimePretty = moment.unix(trainTime).format("HH:mm");

        // //Todo check into correct equation and format
        // Calculate the time to next train
        //Takes current time and subtracts the time until next train time using the frequency and initial train time.
        // First Time (pushed back 1 year to make sure it comes before current time)
        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        console.log(trainTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tminusTime = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tminusTime);

        // Next Train
        var nextTrain = moment().add(tminusTime, "minutes").format("HH:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFreq),
            $("<td>").text(trainTimePretty),
            $("<td>").text(tminusTime),
            $("<td>").text(nextTrain)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });


});

