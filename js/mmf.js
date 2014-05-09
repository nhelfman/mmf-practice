var questionNum = 1;
var maxQuestions = 35;
var correctAnswers = 0;
var mistakes = "";
var timeSeconds = 40;

var startTime = 0;

function showFinishedModal(title) {
	$("#finishedMsg").text(title);
	$("#correctAnswers").text(correctAnswers);
	$("#totalQuestions").text(questionNum - 1);
	$("#incorrectAnswers").html(mistakes == "" ? "None" : mistakes);
	$("#modalFinished").modal("show");	
}

function numEntered(num) {
	console.log("number key clicked");

	var ans = $("#ans").text();
	console.log("current answer=" + ans);

	var val = new Number(num);	
	if (ans == "__") {
		$("#ans").text(val);
		$("#btnGo").removeAttr("disabled");
		$("#btnDel").removeAttr("disabled");
	} else {
		if (ans.length == 2) {
			return; // max 2 digits
		}
		
		$("#ans").text(ans + val);
	
	}
}

function goNext() {
	console.log("Go clicked " + questionNum);
	questionNum++;
	
	var ans = $("#ans").text();

	// check answer
	var num1 = parseInt($("#num1").text());
	var num2 = parseInt($("#num2").text());

	var sum = num1 + num2;

	console.log("sum=" + sum);
	
	$("#result").removeClass("alert-success alert-danger");	
	if (sum == ans) {
		correctAnswers++;
	} else {
		mistakes += "<li> " + num1 + " + " + num2 + " = " + sum + ",  not " + ans + "</li>";
	}


	$("#qnum").text(questionNum);	
	$("#ans").text("__");

	$("#questions-bar").css("width", (questionNum * 100 / maxQuestions) + "%");


	if (questionNum == maxQuestions) {
		$("#time-bar").stop();
		showFinishedModal("Finished all questions!");
		return;
	}

	$("#num1").text(Math.floor(Math.random() * 10));
	$("#num2").text(Math.floor(Math.random() * 10));

	$("#btnGo").attr("disabled", "disabled");
	$("#btnDel").attr("disabled", "disabled");

}



$(function() {
    FastClick.attach(document.body);
});

$(function() {

$("#btnTryAgain").click(function() {
	location.reload(true);

});

$("#ans").text("__");

$("#num1").text(Math.floor(Math.random() * 10));
$("#num2").text(Math.floor(Math.random() * 10));

startTime = Date.now();

var intervalId = window.setInterval(function() {
	var elapsed = (Date.now() - startTime);
	//console.log("time elapsed " + elapsed);

	var elapsedPercent = elapsed * 100 / (timeSeconds * 1000);

	$("#time-bar").css("width", elapsedPercent + "%");

	if (elapsed > timeSeconds * 1000) {
		console.log("Time is over");
		clearInterval(intervalId);
		showFinishedModal("Sorry, time is up!");
	}

}, 500);


});

$("body").keypress(function(event) {
	console.log ("key pressed: " + event.which + " num=" + (event.which - 48));

	var which = event.which;

	if (which == 13) {
		console.log("go");
		goNext();
	} else if (which > 48 && which < 48 + 10) {
		var num = which - 48;

		console.log ("num pressed = " + num);
		numEntered(num);
	}
});

$("#keys button").click(function() {
console.log("button click val=" + $(this).val());


var val = $(this).val();
var ans = $("#ans").text();

if (!isNaN(val)) {
	numEntered(val);
} else {
	switch(val) {
		case "D":
			console.log("Del clicked");
			if (ans.length == 1) {
				$("#ans").text("__");
				$("#btnGo").attr("disabled", "disabled");
				$("#btnDel").attr("disabled", "disabled");
			} else {
				$("#ans").text(ans.substring(0, ans.length - 1));
				$("#btnDel").removeAttr("disabled");
			}
			break;

		case "go":
			goNext();
			break;

	}

}


});

