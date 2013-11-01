using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using MongoDB.Driver;

namespace TechJam.Controllers
{
    public class MongoController : Controller
    {

        public ActionResult Users()
        {
            var connectionString = "mongodb://infjam.cloudapp.net:27017/";
            var db = new MongoClient(connectionString).GetServer().GetDatabase("db");
            var allUsers = db.GetCollection("users").FindAll();
            return Content(MongoDB.Bson.BsonExtensionMethods.ToJson(allUsers), "application/json");
        }

        public ActionResult News()
        {
            var connectionString = "mongodb://infjam.cloudapp.net:27017/";
            var db = new MongoClient(connectionString).GetServer().GetDatabase("db");
            var all = db.GetCollection("news").FindAll();
            return Content(MongoDB.Bson.BsonExtensionMethods.ToJson(all), "application/json");
        }

    }
}
