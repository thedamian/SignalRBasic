"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

var QuestionIndex = 0;

connection.on("NewQuestion", function (message) {
    
    if (message.Answers) {

        document.getElementById("question").innerHTML = message.Question;

        for(var i=0;i<message.Answers.length-1;i++) {
            var li = document.createElement("li");
            li.textContent = Question;
            document.getElementById("answers").appendChild(li);
        }

        for (var x=0;i<message.Winners.length-1;i++)
        {
            var li = document.createElement("li");
            li.textContent = Question;
            document.getElementById("winners").appendChild(li);
        }
        
    }
});

connection.start().then(function(){

}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("NextQuestionBtn").addEventListener("click", function (event) {
    event.preventDefault();

    connection.invoke("NextQuestion", QuestionIndex).catch(function (err) {
        QuestionIndex++;
        return console.error(err.toString());
    });
});

