using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Diagnostics;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
    public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }

}