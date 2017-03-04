$(document).ready(function() {
    //global variables
    var correct = 0;
    var incorrect = 0;
    var questionCounter = 0;
    var count = 10;
    var countdown;

    //jQuery shortcuts
    var question = $(".questions-ask");
    var input = $(".questions-answer");
    var answerRight = $(".questions-correct");
    var answerWrong = $(".questions-incorrect");
    var timeLeft = $(".questions-time");

    //create an array of objects that hold questions and anwers
    var questions = [{
        question: "What is 2*5?",
        choices: [2, 5, 10, 15],
        correctAnswer: 10
    }, {
        question: "What is 10*6?",
        choices: [30, 60, 90, 18],
        correctAnswer: 60
    }, {
        question: "What is 4*5?",
        choices: [20, 02, 200, 9],
        correctAnswer: 20
    }, {
        question: "What is 11*7?",
        choices: [42, 5, 8, 77],
        correctAnswer: 77
    }, {
        question: "What is 9*9?",
        choices: [20, 18, 81, 64],
        correctAnswer: 81
    }];



    // set scores and questions to 0, then load the questions
    var initialState = () => {
        correct = 0;
        incorrect = 0;
        questionCounter = 0;

        loadQuestions();

    };

    // write start button to DOM
    var startGame = () => {

        input.append('<button class="questions-retry" value ="retry">Start</button>');
    };

    // dynamic write questions and choices to the DOM
    var loadQuestions = () => {
        count = 10;
        clearInterval(countdown);
        countdown = setInterval(function() {

            timeLeft.html(count);
            count--;
            if (count < 0) {
                clearInterval(countdown);

                // increase wrong for no input
                incorrect++;
                revealCorrect("No Answer");

            }

        }, 1000);

        //write this index's question
        question.html(questions[questionCounter].question);

        // loop through the choices arrays and build the choices
        var choices = "";
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            choices += `<button class="questions-input" value="${questions[questionCounter].choices[i]}">${questions[questionCounter].choices[i]}</button>`;
        }

        // write this question's choices
        input.html(choices);
    };

    // when there is no more questions, show the score
    var showResults = () => {
        var results = `<div>Correct: ${correct} </div> <br/><div>Wrong: ${incorrect}</wrong>`;
        question.html("Score");
        input.html(results);
        input.append('<button class="questions-retry" value ="retry">Retry</button>');
        clearInterval(countdown);
        timeLeft.html("");
    };

    // show correct answer for x seconds then move to next question
    var revealCorrect = (ans) => {
        clearInterval(countdown);
        var correctAns = questions[questionCounter].correctAnswer;
        var results = `<div>Your Choice: ${ans} </div><br/> <div>Correct Answer: ${correctAns}</div>`;
        question.html("Result");
        input.html(results);

        //show next question until it reach the end of question array
        setTimeout(function() {

            questionCounter++;
            if (questionCounter < questions.length) {

                loadQuestions(questionCounter);
            } else {
                showResults();
            }
        }, 2000);

    };

    // add click event to the buttons. need to use delegate for dynamically created elements
    input.delegate(".questions-input", "click", function(e) {
        e.preventDefault();

        var userChoice = $(this).val();
        if (parseInt(userChoice) === questions[questionCounter].correctAnswer) {
            correct++;

        } else {
            incorrect++;

        }

        revealCorrect(userChoice);

    });

    input.delegate(".questions-retry", "click", function(e) {
        e.preventDefault();

        initialState();
    });

    startGame();

});
