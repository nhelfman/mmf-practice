var questionNum = 1;
var maxQuestions = 10;
var correctAnswers = 0;
var mistakes = "";
var timeSeconds = 10;

function showFinishedModal(title) {
	$("#finishedMsg").text(title);
	$("#correctAnswers").text(correctAnswers);
	$("#totalQuestions").text(questionNum - 1);
	$("#incorrectAnswers").html(mistakes);
	$("#modalFinished").modal("show");	
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

$("#time-bar").animate({ width: "100%" }, {duration: timeSeconds * 1000, easing: "linear", 
		done: function() {
			showFinishedModal("Sorry, time is up!");
		}
	});

});


$("#keys button").click(function() {
console.log("button click val=" + $(this).val());

var val = $(this).val();
var ans = $("#ans").text();

if (!isNaN(val)) {
	console.log("number key clicked");

	console.log("current answer=" + ans);
	
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
			console.log("Go clicked " + questionNum);
			questionNum++;
			
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
			break;

	}

}


});

