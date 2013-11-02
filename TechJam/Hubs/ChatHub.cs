using Microsoft.AspNet.SignalR;

namespace TechJam.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string message)
        {
            Clients.Others.newMessage(message);
        }
    }
}