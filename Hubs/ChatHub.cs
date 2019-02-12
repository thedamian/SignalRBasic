using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        quiz.Models.Quiz[] quizAnswers = new quiz.Models.Quiz[4];

        public ChatHub () {
            quizAnswers[0]  = new quiz.Models.Quiz("Argentina",new string[]{"buenos Aires","ArgentinaCity"},0);
            quizAnswers[1]  = new quiz.Models.Quiz("Colombia",new string[]{"Bogota","Colombia City"},0);
            quizAnswers[2]  = new quiz.Models.Quiz("United States",new string[]{"Washinton","USA City"},0);
            quizAnswers[3]  = new quiz.Models.Quiz("Panama",new string[]{"Suaita","Panama City"},1);
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message + quizAnswers[0].Question);
        }
    }

}