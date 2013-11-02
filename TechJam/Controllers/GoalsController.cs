using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TechJam.Controllers
{
    public class GoalsController : Controller
    {
        //
        // GET: /Goals/

        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult GoalSetting()
        {
            return PartialView("_GoalSetting");
        }

    }
}
