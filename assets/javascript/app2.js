var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who was Ash Ketchum's very first Pokemon?", "Fill in the blank: Bye Bye __________.", "Brock's large snake-like rock Pokemon.", "Which Pokemon is not a legendary bird?", "Select the evolve for of Eevee.", "First Pokemon in the show to hatch from an egg?", "The first Pokemon Movie featured the battle of ________ vs. _______.", "Who was the mascot of Team Rocket?"];
var answerArray = [["Bulbasaur", "Squirtle", "Pikachu", "Charmander"], ["Bellsprout", "Butterfree", "Bassnectar", "Bulbasaur"], ["Geodude", "Golem", "Machop", "Onyx"], ["Pidgey", "Articuno", "Zapados", "Moltres"], ["Vaporeon", "Jolteon", "Flareon", "All of the Above"], ["Pichu", "Meowth", "Togepi", "Jigglypuff"], ["Lugia vs. Ho-oh", "Mew vs. Mewtwo", "Hitmonchan vs. Hitmonlee", "Trump vs. Hillary"], ["Meowth", "Koffing", "Ekans", "Zubat"]];
var correctAnswers = ["C. Pikachu", "B. Butterfree", "D. Onyx", "A. Pidgey", "D. All of the Above", "C. Togepi", "B. Mew vs. Mewtwo", "A. Meowth"];
var questionCounter = 0;
var selecterAnswer; 
var Timer;
var correctCounter = 0;
var incorrectCounter = 0;
var timedOutCounter = 0;

var myMusic = new Audio("assets/Music/Pokémon Theme Song.mp3");

var imageArray = ["<img src='assets/images/CHU.png'>","<img src='assets/images/FREEE.png'>", "<img src='assets/images/onyx.png'>", "<img src='assets/images/PIDGE.png'>", ["<img src='assets/images/vapo.png'>", "<img src='assets/images/flare.png'>", "<img src='assets/images/jolteon.png'>"], "<img src='assets/images/togetoge.png'>", ["<img src='assets/images/MEW.png'>", "<img src='assets/images/mewtwo.png'>"], "<img src='assets/images/MEOWWWTH.png'>"]

$(document).ready(function(){
    function screenStart() {
        startScreen = "<p class='text-center main-button-container'><a class='btn start-button' href='#' role='button'><img src='assets/images/pokeball2.jpg'>Click PokeBall to start!</a></p>";
        $(".gameContent").html(startScreen);
    }
    screenStart();
});

$("body").on("click", ".start-button", function(event){ 
	gameStart();

	countdown();

	myMusic.play();


});

$("body").on("click", ".answer", function(event){
    selecterAnswer = $(this).text();
    if (selecterAnswer === correctAnswers[questionCounter]) {
        clearInterval(Timer);
        winner();
    }
    else {
        clearInterval(Timer);
        loser();
    }
});
$("body").on("click", ".reset-button", function(event){
	resetGame();
});

function timeUpLoss() {
	timedOutCounter++;
	gameHTML = "<p id='texties' class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p id='texties' class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".gameContent").html(gameHTML);
	setTimeout(wait, 2000);
}

function winner() {
	correctCounter++;
	gameHTML = "<p id='texties' class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p id='texties' class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".gameContent").html(gameHTML);
    setTimeout(wait, 2000);
}

function loser() {
    incorrectCounter++;
	gameHTML = "<p id='texties' class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p id='texties' class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".gameContent").html(gameHTML);
    setTimeout(wait, 2000);
}

function gameStart() {
	gameHTML = "<p id='texties' class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p id='texties' class='text-center'>" + questionArray[questionCounter] + "</p><p id='texties' class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p id='texties' class='answer'>B. "+answerArray[questionCounter][1]+"</p><p id='texties' class='answer'>C. "+answerArray[questionCounter][2]+"</p><p id='texties' class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".gameContent").html(gameHTML);
	
}

function wait() {
	if (questionCounter < 7) {
        questionCounter++;
        gameStart();
        counter = 30;
        countdown();
	}
	else {
		finalScreen();
	}
};


function countdown() {
	Timer = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(Timer);
			timeUpLoss();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}
function finalScreen() {
	gameHTML = "<p id='texties' class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p id='texties' class='text-center'>Your Score:" + "</p>" + "<p id='texties' class='summary-correct'>Correct Answers: " + correctCounter + "</p>" + "<p id='texties'>Wrong Answers: " + incorrectCounter + "</p>" + "<p id='texties'>Unanswered: " + timedOutCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Restart!</a></p>";
	$(".gameContent").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctCounter = 0;
	incorrectCounter = 0;
	timedOutCounter = 0;
	counter = 30;
	gameStart();
    countdown();
}

