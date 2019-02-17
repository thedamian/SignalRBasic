
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

let QuestionIndex = 0;
let RightAnswer = 0;
let QuestionTimeStart =  new Date();
let players = [];

connection.on("NewQuestion", function (QuestionReply) {
    if (QuestionReply.answers) {
    document.getElementById("answers").innerHTML = "";
        document.getElementById("question").innerHTML = QuestionReply.question;
        QuestionReply.answers.map(a => {
            const li = document.createElement("li");
            li.textContent = a;
            document.getElementById("answers").appendChild(li);
        });     
        QuestionTimeStart =  new Date();    
        RightAnswer = QuestionReply.correctAnswerIndex;
    } else {
        document.getElementById("question").innerHTML = "The World";
        document.getElementById("answers").innerHTML = "Game Ended";
    }
});

connection.on("NewAnswer", function (PlayerName,AnswerIndex) {
    let PlayerFound = false;
    let PlayerScore = (new Date()) - QuestionTimeStart;
    PlayerScore = 10000-PlayerScore;
    if ( (AnswerIndex != RightAnswer) || PlayerScore < 0)  {
        PlayerScore = 0;
    }
    players.map(p => {
        if (p.PlayerName == PlayerName) {
            p.PlayerScore += PlayerScore;
            PlayerFound = true;
        }
    });
    if (!PlayerFound) {
        players.push({PlayerName:PlayerName,PlayerScore:PlayerScore});
    }
    // Sort with the heighest score
    players.sort((a, b) => b.PlayerScore - a.PlayerScore);
    document.getElementById("winners").innerHTML = "";
    players.map(p => {
        document.getElementById("winners").innerHTML += p.PlayerName + " Score:" + p.PlayerScore+"<BR/>";
    });
});

connection.start().then(function(){
    }).catch(function (err) {
        return console.error(err.toString());
});

document.getElementById("NextQuestionBtn").addEventListener("click", function (event) {
    event.preventDefault();


    connection.invoke("NextQuestion", QuestionIndex)
    .then(function() {
        QuestionIndex++;
    }).catch(function (err) {       
        return console.error(err.toString());
    });
});

