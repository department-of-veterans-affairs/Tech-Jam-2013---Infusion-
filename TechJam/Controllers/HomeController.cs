using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace TechJam.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var connectionString = "mongodb://infjam.cloudapp.net:27017/";
            var db = new MongoClient(connectionString).GetServer().GetDatabase("db");
            var lastThree = db.GetCollection("news").FindAll().SetSortOrder(SortBy.Descending("_id")).SetLimit(3);
            ViewBag.News = lastThree;
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

        public ActionResult Documents()
        {
            ViewBag.Message = "Your history page.";

            return View();
        }
    }
}
