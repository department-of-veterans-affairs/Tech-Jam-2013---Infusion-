using Microsoft.AspNet.SignalR;

namespace TechJam.Hubs
{
    public class ChatHub : Hub
    {
        public void SendOffer(string message)
        {
            Clients.Others.receiveOffer(message);
        }
    }
}