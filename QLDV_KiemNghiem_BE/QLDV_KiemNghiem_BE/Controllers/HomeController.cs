using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QLDV_KiemNghiem_BE.Controllers
{
    public class HomeController : Controller
    {
        // GET: HomeController
        public ActionResult Index()
        {
            return Content("Dich vu quan ly kiem nghiem xin chao");
        }

    }
}
