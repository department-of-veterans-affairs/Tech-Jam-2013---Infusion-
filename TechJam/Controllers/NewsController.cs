using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Driver;

namespace TechJam.Controllers
{
    public class NewsController : Controller
    {
        //
        // GET: /News/

        public ActionResult Index()
        {
            var connectionString = "mongodb://infjam.cloudapp.net:27017/";
            var db = new MongoClient(connectionString).GetServer().GetDatabase("db");
            var all = db.GetCollection("news").FindAll();
            ViewBag.News = all;
            return View();
        }

        public ActionResult Select()
        {
            return View();
        }

    }
}
