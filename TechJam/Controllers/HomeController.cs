using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TechJam.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult History()
        {
            ViewBag.Message = "Your history page.";

            return View();
        }

        public ActionResult Doctors()
        {
            ViewBag.Message = "Your history page.";

            return View();
        }

        public ActionResult Appointments()
        {
            ViewBag.Message = "Your history page.";

            return View();
        }

        public ActionResult Goals()
        {
            ViewBag.Message = "Your history page.";

            return View();
        }

        public ActionResult Documents()
        {
            ViewBag.Message = "Your history page.";

            return View();
        }
    }
}
