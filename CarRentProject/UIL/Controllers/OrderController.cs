using BLL;
using BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using UIL.Filters;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]

    public class OrderController : ApiController
    { 
        // GET: api/Order
        [BasicAuthFilter] //פילטר של זיהוי
        [Authorize(Roles = "admin")]  //פילטר של הרשאות
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<OrderModel[]>(OrdersManager.SelectAllOrders(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Order/5
        [BasicAuthFilter]
        [Authorize(Roles = "worker,admin,client")]
        public HttpResponseMessage Get(int userId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<OrderModel[]>(OrdersManager.SelectAllUserOrdersByUserId(userId), new JsonMediaTypeFormatter())
            };
        }
        //[Route("api/Order?orderId={orderId}")]
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage GetByORderId(int orderId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<OrderModel>(OrdersManager.SelectOrderByOrderId(orderId), new JsonMediaTypeFormatter())
            };
        }

        [BasicAuthFilter]
        [Authorize(Roles = "worker,admin")]
        public HttpResponseMessage Get(string carNumber)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<OrderModel[]>(OrdersManager.SelectAllCarOrdersByCarNumber(carNumber), new JsonMediaTypeFormatter())
            };
        }

        // POST: api/Order
        [BasicAuthFilter]
        [Authorize(Roles = "worker,admin,client")]
        public HttpResponseMessage Post([FromBody]OrderModel value)
        {
            bool insertResult = false;

            if (ModelState.IsValid)
            {
                insertResult = OrdersManager.InsertOrder(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Order/5
        [BasicAuthFilter]
        [Authorize(Roles = "worker,admin")]
        public HttpResponseMessage Put(int id, [FromBody]OrderModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = OrdersManager.UpdateOrderByOrderId(id, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };

        }

        // DELETE: api/Order/5
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Delete(int orderId)
        {
            bool deleteResult = OrdersManager.DeleteOrder(orderId);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }
}
