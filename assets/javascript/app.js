// $(document).on("ready", function () {

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
        var trainTime = moment($("#train-time-input").val().trim(), "MM/DD/YYYY").format("X");
        var trainFreq = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            role: trainDestination,
            start: trainTime,
            rate: trainFreq
        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.role);
        console.log(newTrain.start);
        console.log(newTrain.rate);

        alert("Employee successfully added");

        // Clears all of the text-boxes
        $("#employee-name-input").val("");
        $("#role-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().role;
        var trainTime = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().rate;

        // Employee Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFreq);
    //Todo check into correct format with moment docs    
        // Prettify the employee start
        var trainTimePretty = moment.unix(trainTime).format("HH:MM");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var empMonths = moment().diff(moment(trainTime, "X"), "months");
        console.log(empMonths);
    //Todo check into correct equation and format
        // Calculate the total billed rate
        var empBilled = empMonths * trainFreq;
        console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainTimePretty),
            $("<td>").text(empMonths),
            $("<td>").text(trainFreq),
            // $("<td>").text(empBilled)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });


// });