using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Diagnostics;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        quiz.Models.Quiz[] quizAnswers = new quiz.Models.Quiz[]{
                        new quiz.Models.Quiz("Argentina",new string[]{"Argentina    City","ponderosa","buenos Aires","Havana"},2),
                        new quiz.Models.Quiz("Colombia",new string[]{"Colombia City","Bogota","Bucaramanga","Cali"},1),
                        new quiz.Models.Quiz("United States",new string[]{"USA City","New York","Washinton","Capital City"},2),
                        new quiz.Models.Quiz("Panama",new string[]{"Panama City","Suaita","Havana"},0),
                        };

        public async Task NextQuestion(int QuestionIndex) {

             if (QuestionIndex < quizAnswers.Length) {
                await Clients.All.SendAsync("NewQuestion" , quizAnswers[QuestionIndex] );
             } else {
                await Clients.All.SendAsync("NewQuestion" , new object() );
             }
             
        }

        public async Task NewAnswer(string PlayerName, int PlayersAnswer) {
                Debug.Write("NewAnswer called");
            await Clients.All.SendAsync("NewAnswer" , PlayerName,PlayersAnswer );
        }

    }

}