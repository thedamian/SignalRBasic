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
    }
});

connection.start().then(function(){
    alert("You're ready to play!!!")
    }).catch(function (err) {
        return console.error(err.toString());
});

function vote(QuestionIndex) {

    let PlayersName = document.getElementById('YourName').value;
    connection.invoke("NewAnswer", PlayersName,QuestionIndex)
    .then(function() {
        console.log("voted for ",PlayersName,QuestionIndex)
    }).catch(function (err) {
        return console.error(err.toString());
    });

};
