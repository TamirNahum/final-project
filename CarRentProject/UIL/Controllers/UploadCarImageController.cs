using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UploadCarImageController : ApiController
    {
        [HttpPost]
        [Route("api/UploadCarImage")]

        public HttpResponseMessage UploadImage()
        {

            var httpRequest = HttpContext.Current.Request;

            //Get Image caption
            string imageCaption = httpRequest.Form["ImageCaption"];

            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename

            var filePath = HttpContext.Current.Server.MapPath("~/CarImages/" + imageCaption + ".jpg");
            postedFile.SaveAs(filePath);
            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
