$(document).ready(function() {

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
            question: "The percentage of mass in our solar system that the sun accounts for is roughly:",
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
            question: "Roughly one quarter of known species of mammals are:",
            one: "Rodents",
            two: "Bats",
            three: "Primates",
            four: "Whales",
            correct: "two",
        },
        {
            question: "Roughly one quarter of known species of mammals are:",
            one: "Rodents",
            two: "Bats",
            three: "Primates",
            four: "Whales",
            correct: "two",
        },
        {
            question: "Roughly one quarter of known species of mammals are:",
            one: "Rodents",
            two: "Bats",
            three: "Primates",
            four: "Whales",
            correct: "two",
        },
    ];
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var intervalId;
    var index = 0;
    var timer = {
        time: 30,
        reset: function() {
            timer.time = 30;
            $("#timer").text("30");
        },
        start: function() {
            clearInterval(intervalId);
            intervalId = setInterval(timer.count, 1000)
        },
        count: function() {
            if (timer.time != 0) {
                timer.time--;
                $("#timer").text(timer.time);
            } else {
                $("#prompt").text("Time's up!");
                index++;
                unanswered++;
                setTimeout(getQuestion, 2000);
            }   
        },
        stop: function() {
            clearInterval(intervalId);
        }
    }

    $("#restart").hide();

    function resetGame() {
        var correct = 0;
        var incorrect = 0;
        var unanswered = 0;
        var index = 0;
        clearInterval(intervalId);
        $("#start").hide();
        $("#restart").hide();
        getQuestion();
    };

    function startGame() {
        $("#start").hide();
        $(".h1 .h2").show();
        $("#prompt").text("Click on the correct answer:");
        getQuestion();
    };

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

    $(".h2").on("click", function() {
        timer.stop();
        $(".h2").empty();
        $("#question").empty();
        if (trivia[index].correct === this.id) {
            $("#prompt").text("Correct!");
            index++;
            correct++;
            setTimeout(getQuestion, 2000);
        } else {
            $("#prompt").text("Incorrect!");
            index++;
            incorrect++;
            setTimeout(getQuestion, 2000);
        }
    })

    function endGame() {
        $("#prompt").text("All done, here's how you did!");
        $("#question").empty();
        $("#one").text("You got " + correct + " questions correct!");
        $("#two").text("You got " + incorrect + " questions incorrect!");
        $("#three").text("Time ran out on " + unanswered + " questions.");
        $("#four").empty();
        $("#restart").show();
    }

    $("#start").on("click", function() {
        startGame();
    })

    $("#restart").on("click", function() {
        resetGame();
    });
    

})

