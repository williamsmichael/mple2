//set global variables
var shape, shapeAmount;
var gameStatus = document.getElementById('gameStatus');
var container = document.getElementById('container');
var buttonBegin = document.getElementById('buttonBegin');
var inputField = document.getElementById('inputField');
var playerGuess = parseInt(inputField.value, 10);

//function generate random number for shape type and quantity of each shape
var randNum = function(qty) {
    return Math.floor((Math.random() * qty) + 1);
}
var randShapeType = randNum(2);
var randNumCircles = randNum(11);
var randNumSquares = randNum(11);
var randNumGuesses = randNum(3);


//buttonBegin function
buttonBegin.onclick = function() {

    //clear the container for the geometric shapes
    container.innerHTML = '';

    //function generate arrays to define shape type through classes
    var arrayCircles = [];
    var arraySquares = [];
    var arrayCombined = [];

    function arrayCreate(randNumShape, arrayShape, className) {
        for (var i = 0; i < randNumShape; i++) {
            arrayShape.push(className);
        }
    }
    //create individual arrays for circles and squares
    arrayCreate(randNumSquares, arraySquares, "square");
    arrayCreate(randNumCircles, arrayCircles, "circle");

    //combine the circles and squares arrays into a single array
    arrayCombined = arrayCircles.concat(arraySquares);

    //function Fisher–Yates Shuffle
    function shuffle(array) {
        var m = array.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    //shuffle the combined array
    var arrayRandomized = shuffle(arrayCombined);

    //function create geometric shapes according to random number generated
    function shapeCreate() {
        for (var i = 0; i < arrayRandomized.length; i++) {
            var div = document.createElement("div");
            div.className = arrayRandomized[i];

            //call random number for color of the shape
            var colorType = randNum(10);
            switch (colorType) {
                case (1):
                    div.className += " gray1";
                    break;
                case (2):
                    div.className += " gray2";
                    break;
                case (3):
                    div.className += " green1";
                    break;
                case (4):
                    div.className += " green2";
                    break;
                case (5):
                    div.className += " red1";
                    break;
                case (6):
                    div.className += " blue1";
                    break;
                case (7):
                    div.className += " blue2";
                    break;
                case (8):
                    div.className += " purple";
                    break;
                case (9):
                    div.className += " yellow";
                    break;
                case (10):
                    div.className += " orange";
                    break;
            }

            var board = document.getElementById('container');
            board.appendChild(div);
        }
    }
    shapeCreate();

    //determine the shape to question player
    if (randShapeType === 1) {
        shape = "circles";
        shapeAmount = randNumCircles;
    } else {
        shape = "squares";
        shapeAmount = randNumSquares;
    }

    //hide the begin button
    document.getElementById('buttonBegin').style.display = "none";

    //begin interaction with the player
    gameStatus.innerHTML = "How many <span class='selected'>" + shape + "</span> do you see... <span class='badge'>" + randNumGuesses + "</span> chance(s) <br> Guess an answer in the box and press RETURN";

    //display input guess box
    document.getElementById("inputField").style.display = "inline-block";

}

//function verify if the player's guess is correct
function verifier(playerGuess) {
    if (randNumGuesses > 0 && playerGuess !== shapeAmount) {
        if (playerGuess < shapeAmount) {
            gameStatus.innerHTML = "Higher. Guess <span class='selected'>" + shape + "</span> again... <span class='badge'>" + randNumGuesses + "</span> chance(s)";
            var playerGuess = parseInt(inputField.value, 10);
        }
        if (playerGuess > shapeAmount) {
            gameStatus.innerHTML = "Lower. Guess <span class='selected'>" + shape + "</span> again... <span class='badge'>" + randNumGuesses + "</span> chance(s)";
            var playerGuess = parseInt(inputField.value, 10);
        }
    }

    // remove shape not selected .container
    function fadeShape() {
        if (shape === "circles") {
            $(".square").animate({opacity: '0.2'}, 1000);
        } else {
            $(".circle").animate({opacity: '0.2'}, 1000);
        }
    };

    // final message to player
    if (randNumGuesses === 0 && playerGuess !== shapeAmount) {
        gameStatus.innerHTML = "The number of <span class='selected'>" + shape + "</span> equals <span class='selected'>" + shapeAmount + "</span>. <span class='gameOver'>Game over </span>";
        fadeShape()
        restart();
    }
    if (playerGuess === shapeAmount) {
        gameStatus.innerHTML = "<span class='congrats'>Fantastic!</span> You guessed it!";
        fadeShape()
        restart();
    }
}

function restart() {
    //hide input guess box
    document.getElementById("inputField").style.display = "none";

    //display input guess box
    document.getElementById("buttonRestart").style.display = "inline-block";
}

//inputField function
inputField.onkeypress = function(event) {
    if (event.which == 13 || event.keyCode == 13) {

        playerGuess = parseInt(inputField.value);

        //begin interactive guessing game
        randNumGuesses--;
        verifier(playerGuess);

        inputField.value = '';
        return false;
    } else return true;

}
