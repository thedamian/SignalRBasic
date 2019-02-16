
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

let QuestionIndex = 0;
let RightAnswer = 0;
let QuestionTimeStart =  new Date();
let players = [];

connection.on("NewQuestion", function (QuestionReply) {
    document.getElementById("answers").innerHTML = "";
    if (QuestionReply.answers) {
        document.getElementById("question").innerHTML = QuestionReply.question;
        QuestionReply.answers.map(a => {
            const li = document.createElement("li");
            li.textContent = a;
            document.getElementById("answers").appendChild(li);
        });     
        QuestionTimeStart =  new Date();    
    }
});

connection.on("NewAnswer", function (PlayerName,AnswerIndex) {
    console.log("NewAnswer",PlayerName,AnswerIndex)
    let PlayerFound = false;
    let PlayerScore = 10000-( new Date()) - QuestionTimeStart;
    if ( (AnswerIndex != RightAnswer) || PlayerScore < 0)  {
        PlayerScore = 0;
    }
    players.map(p => {
        if (p.PlayerName == p.PlayerName) {
            p.PlayerScore += PlayerScore;
            PlayerFound = true;
        }
    });
    if (!PlayerFound) {
        players.push({PlayerName:PlayerName,PlayerScore:PlayerScore});
    }
    // Sort with the heighest score
    players.sort((a, b) => b.PlayerScore - a.PlayerScore);

    players.map(p => {
        var li = document.createElement("li");
        li.textContent = p.PlayerName + " Score:" + p.PlayerScore;
        document.getElementById("winners").appendChild(li);
    });
});

connection.start().then(function(){
    }).catch(function (err) {
        return console.error(err.toString());
});

document.getElementById("NextQuestionBtn").addEventListener("click", function (event) {
    console.log("button clicked!")
    event.preventDefault();


    connection.invoke("NextQuestion", QuestionIndex)
    .then(function() {
        QuestionIndex++;
        console.log("Next Question called");
    }).catch(function (err) {
        
        return console.error(err.toString());
    });
});

