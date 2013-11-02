using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(TechJam.App_Start.SignalRStartup))]
namespace TechJam.App_Start
{
    public class SignalRStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}