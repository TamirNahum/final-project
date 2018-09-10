using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UploadUserImageController : ApiController
    {
        [HttpPost]
        [Route("api/UploadUserImage")]
        public HttpResponseMessage UploadImage()
        {

            var httpRequest = HttpContext.Current.Request;

            //Get Image caption
            string imageCaption = httpRequest.Form["ImageCaption"];

            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename

            var filePath = HttpContext.Current.Server.MapPath("~/UserImages/" + imageCaption+".jpg");
            postedFile.SaveAs(filePath);
            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
