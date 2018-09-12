using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Formatting;

using System.Web.Http.Cors;


using BOL;
using BLL;
using UIL.Filters;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Cars")]
    public class CarsController : ApiController
    {
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectAllCars(), new JsonMediaTypeFormatter())
            };
        }
        [HttpGet]
        [Route("getProper")]
        [AllowAnonymous]
        public HttpResponseMessage GetProper()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectAllProperCars(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Cars/5
        [AllowAnonymous]
        public HttpResponseMessage Get(string carNumber)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel>(CarsManager.SelectCarByCarNumber(carNumber), new JsonMediaTypeFormatter())
            };
        }

        [HttpGet]
        [Route("isExist")]
        [AllowAnonymous]
        public HttpResponseMessage IsExist(string carNumber)
        {

            if (CarsManager.IsCarExists(carNumber))
                return new HttpResponseMessage(HttpStatusCode.OK);

            return new HttpResponseMessage(HttpStatusCode.BadGateway);
          
        }

        [Route("getManual")]
        [AllowAnonymous]
        public HttpResponseMessage GetByIsManual(string isManual)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByTransmission(isManual), new JsonMediaTypeFormatter())
            };
        }
        [Route("getCompany")]
        [AllowAnonymous]
        public HttpResponseMessage GetByCompany(string manufacturer)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByManufacturer(manufacturer), new JsonMediaTypeFormatter())
            };
        }

        [Route("getModel")]
        [AllowAnonymous]
        public HttpResponseMessage GetByModel(string model)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByModel(model), new JsonMediaTypeFormatter())
            };
        }

        [Route("getYear")]
        [AllowAnonymous]
        public HttpResponseMessage GetByManufecturYear(int manufecturYear)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByManufecturYear(manufecturYear), new JsonMediaTypeFormatter())
            };
        }
        // POST: api/Cars
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Post([FromBody]CarModel value)
        {
            bool insertResult = false;

            ////ModelState is the parameter that we got to the Post function (value in our case)
            //if (ModelState.IsValid)
            {
                insertResult = CarsManager.InsertCar(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Cars/5
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Put(int id, [FromBody]CarModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = CarsManager.UpdateCarByCarId(id, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Cars/5
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Delete(int carId)
        {
            bool deleteResult = CarsManager.DeleteCar(carId);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
