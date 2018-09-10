using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;

using System.Web.Http.Cors;


using BOL;
using BLL;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]
    public class CarTypesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarTypeModel[]>(CarTypesManager.SelectAllCarTypes(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/CarTypes
        public IEnumerable<string> Get(string a)
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CarTypes/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CarTypes
        public HttpResponseMessage Post([FromBody]CarTypeModel value)
        {
            bool insertResult = false;

            ////ModelState is the parameter that we got to the Post function (value in our case)
            //if (ModelState.IsValid)
            {
                insertResult = CarTypesManager.InsertCarType(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/CarTypes/5
        public HttpResponseMessage Put(int id, [FromBody]CarTypeModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = CarTypesManager.UpdateCarTypeByCarTypeId(id, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/CarTypes/5
        public HttpResponseMessage Delete(int carTypeId)
        {
            bool deleteResult = CarTypesManager.DeleteCarType(carTypeId);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
