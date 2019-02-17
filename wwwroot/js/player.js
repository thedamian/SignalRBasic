const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


connection.on("NewQuestion", function (QuestionReply) {
    document.getElementById("answers").innerHTML = "";

    if (QuestionReply.answers) {
        document.getElementById("question").innerHTML = QuestionReply.question;
        let QuestionIndex = 0;
        QuestionReply.answers.map(a => {
            document.getElementById("answers").innerHTML += `<button onclick='vote(${QuestionIndex})'>${a}</button><BR>`;
            QuestionIndex ++
        });       
    }else {
        document.getElementById("question").innerHTML = "The World";
        document.getElementById("answers").innerHTML = "Game Ended";
    }
});

connection.start().then(function(){
    alert("Put in your Name");
    }).catch(function (err) {
        return console.error(err.toString());
});

function vote(QuestionIndex) {

    let PlayersName = document.getElementById('YourName').value;
    connection.invoke("NewAnswer", PlayersName,QuestionIndex)
    .then(function() {
    }).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("answers").innerHTML = "Nice VOTE!";

};
