using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text.RegularExpressions;

namespace TechJam.Controllers
{
    public class DoctorController : Controller
    {
        //
        // GET: /Doctor/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult News()
        {
            return View();
        }

        public ActionResult NewsPreview(string url)
        {
            var result = string.Empty;
            try
            {
                using (var webClient = new System.Net.WebClient())
                {
                    result = webClient.DownloadString(url);
                }
            }
            catch (Exception e) // bad but it's a hackathon!
            {
                return Json(new { });
            }

            var title = Regex.Match(result, @"<title>\s*(.+?)\s*</title>").Groups[1].Value;
            var thumbnail = Regex.Match(result, "<meta itemprop=\"thumbnailUrl\" name=\"thumbnail\" content=\"(.+?)\">").Groups[1].Value;
            var description = Regex.Match(result, "<meta itemprop=\"description\" name=\"description\" content=\"(.+?)\">").Groups[1].Value;

            return Json(new {title=title, thumbnail=thumbnail, description=description}, JsonRequestBehavior.AllowGet);
        }

    }
}
