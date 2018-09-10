using System;
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
    [RoutePrefix("api/Cars")]
    public class CarsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectAllCars(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Cars/5
        public HttpResponseMessage Get(string carNumber)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel>(CarsManager.SelectCarByCarNumber(carNumber), new JsonMediaTypeFormatter())
            };
        }

        [Route("getManual")]
        public HttpResponseMessage GetByIsManual(string isManual)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByTransmission(isManual), new JsonMediaTypeFormatter())
            };
        }
        [Route("getCompany")]
        public HttpResponseMessage GetByCompany(string manufacturer)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByManufacturer(manufacturer), new JsonMediaTypeFormatter())
            };
        }

        [Route("getModel")]
        public HttpResponseMessage GetByModel(string model)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByModel(model), new JsonMediaTypeFormatter())
            };
        }

        [Route("getYear")]
        public HttpResponseMessage GetByManufecturYear(int manufecturYear)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsManager.SelectCarsByManufecturYear(manufecturYear), new JsonMediaTypeFormatter())
            };
        }
        // POST: api/Cars
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
        public HttpResponseMessage Delete(int carId)
        {
            bool deleteResult = CarsManager.DeleteCar(carId);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
