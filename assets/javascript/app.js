$(document).ready(function() {
    // array of question objects
    var trivia = [
        {
            question: "Roughly one quarter of known species of mammals are:",
            one: "Rodents",
            two: "Bats",
            three: "Primates",
            four: "Whales",
            correct: "two",
        },
        {
            question: "The length of a single uncoiled DNA strand is:",
            one: "6 inches",
            two: "2 feet",
            three: "6 feet",
            four: "1 mile",
            correct: "three",
        },
        {
            question: "The number of vertebrae in a giraffe's neck is:",
            one: "The same as in humans",
            two: "More than in humans",
            three: "Less than in humans",
            four: "Twice as many as in humans",
            correct: "one",
        },
        {
            question: "The percentage of mass that the sun accounts for in our solar system is:",
            one: "87.6%",
            two: "59.7%",
            three: "78.9%",
            four: "99.8%",
            correct: "four",
        },
        {
            question: "The amount of time it takes for light from the sun to arrive on Earth is about:",
            one: "4 minutes and 12 seconds",
            two: "6 minutes and 44 seconds",
            three: "8 minutes and 20 seconds",
            four: "10 minutes and 18 seconds",
            correct: "three",
        },
        {
            question: "Which planet has the most moons?",
            one: "Saturn",
            two: "Mars",
            three: "Jupiter",
            four: "Venus",
            correct: "three",
        },
        {
            question: "At what temperature are Celsium and Fahrenheit equal?",
            one: "zero",
            two: "32 degrees",
            three: "24 degrees",
            four: "- 40 degrees",
            correct: "four",
        },
        {
            question: "A Tropical storm becomes a hurricane at what speed?",
            one: "57 mph",
            two: "74 mph",
            three: "96 mph",
            four: "107 mph",
            correct: "two",
        },
        {
            question: "The idea of the atom was first introduced in:",
            one: "1791",
            two: "1942",
            three: "1050",
            four: "450 B.C.",
            correct: "four",
        },
        {
            question: "A hummingbird's heart rate while in flight can reach:",
            one: "170 bpm",
            two: "240 bpm",
            three: "620 bpm",
            four: "1,260 bpm",
            correct: "four",
        },
    ];
    // counters for correct, incorrect, and unanswered questions
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    // variable to hold the setInterval for the timer object
    var intervalId;

    // variable to keep track of what question the game is on
    var index = 0;
    var gameOver = false;
    // timer object
    var timer = {
        time: 15,
        reset: function() {
            timer.time = 15;
            $("#timer").text("15");
        },
        start: function() {
            clearInterval(intervalId);
            intervalId = setInterval(timer.count, 1000)
        },
        // count method contains the logic for what to do when time runs out
        count: function() {
            if (gameOver) {
                return;
            } else if (timer.time != 0) {
                timer.time--;
                $("#timer").text(timer.time);
            } else {
                $("#prompt").text("Time's up!");
                index++;
                unanswered++;
                setTimeout(getQuestion, 1200);
            }   
        },
        stop: function() {
            clearInterval(intervalId);
        }
    }
    // hide the restart button until the end of the game
    $("#restart").hide();
    // reset game, variables, timer, html elements, then get the first question to play again
    function resetGame() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        index = 0;
        clearInterval(intervalId);
        $("#start").hide();
        $("#restart").hide();
        $(".h2").removeClass("endGame");
        getQuestion();
        gameOver = false;
    };
    // hide the start button, show the html fields for the question and answers, get the first question
    function startGame() {
        $("#start").hide();
        $(".h1 .h2").show();
        $("#prompt").text("Click on the correct answer:");
        getQuestion();
    };
    // checks to see if there are any questions left in the array, if so, reset the timer
    // and put the question and answers up, then start the timer. If no more ?s, end game
    function getQuestion() {
        if (index < trivia.length) {
            timer.reset();
            $("#prompt").text("Click on the correct answer:");
            $("#question").text(trivia[index].question);
            $("#one").text(trivia[index].one);
            $("#two").text(trivia[index].two);
            $("#three").text(trivia[index].three);
            $("#four").text(trivia[index].four);
            timer.start();
        } else {
            endGame();
        }
    };
    // click function for the answer. If game is over, do not respond to clicks. Otherwise
    // stop the timer, blank out the question and answers. If the answer is correct, tell
    // the user, increment the index and correct counters, and get the next question after
    // 1.2 seconds. If incorrect, do all the same except for with the incorrect counter and tell the 
    // user what the correct answer was
    $(".h2").on("click", function () {
        if (gameOver) {
            event.preventDefault();
        } else {
            timer.stop();
            $(".h2").empty();
            $("#question").empty();
            if (trivia[index].correct === this.id) {
                $("#prompt").text("Correct!");
                index++;
                correct++;
                setTimeout(getQuestion, 1200);
            } else {
                $("#prompt").text("Incorrect!");
                if (trivia[index].correct === "one") {
                    $("#question").text("The correct answer is " + trivia[index].one.toLowerCase() + ".");
                } else if (trivia[index].correct === "two") {
                    $("#question").text("The correct answer is " + trivia[index].two.toLowerCase() + ".");
                } else if (trivia[index].correct === "three") {
                    $("#question").text("The correct answer is " + trivia[index].three.toLowerCase() + ".");
                } else {
                    $("#question").text("The correct answer is " + trivia[index].four.toLowerCase() + ".");
                };
                index++;
                incorrect++;
                setTimeout(getQuestion, 1200);
            }
        }
    })
    // endGame puts up a lot of html to let the user know their stats for the game
    function endGame() {
        gameOver = true;
        $("#prompt").text("All done, here's how you did!");
        $("#question").html("<h2>You got " + correct + " questions correct! <br> You got " + incorrect + " questions incorrect!</h2>");
        $("#one").text("Time ran out on " + unanswered + " questions.");
        $("#two").empty();
        $("#three").empty();
        $("#four").empty();
        $("#restart").show();
        $(".h2").addClass("endGame");
    }
    // click functions for the buttons
    $("#start").on("click", function() {
        startGame();
    })

    $("#restart").on("click", function() {
        resetGame();
    });
    

})

