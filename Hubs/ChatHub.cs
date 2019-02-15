using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        quiz.Models.Quiz[] quizAnswers = new quiz.Models.Quiz[]{
                        new quiz.Models.Quiz("Argentina",new string[]{"ArgentinaCity","ponderosa","buenos Aires","Havana"},2),
                        new quiz.Models.Quiz("Colombia",new string[]{"Colombia City","Bogota","Bucaramanga","Cali"},1),
                        new quiz.Models.Quiz("United States",new string[]{"USA City","New York","Washinton","Capital City"},2),
                        new quiz.Models.Quiz("Panama",new string[]{"Panama City","Suaita","Havana"},0),
                        };

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user , quizAnswers[0] );
        }

        public async Task NextQuestion(int QuestionIndex) {
            await Clients.All.SendAsync("NewQuestion" , quizAnswers[QuestionIndex] );
        }

    }

}