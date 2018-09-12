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
    public class UserController : ApiController
    {
        // GET: api/User
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<UserModel[]>(UserManager.SelectAllUsers(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/User/5
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Get(int userId)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<UserModel>(UserManager.SelectUserByUserId(userId), new JsonMediaTypeFormatter())
            };
        }

        [Route("api/User/{userName}/{password}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(string userName,string password)
        {
            UserModel user = UserManager.SelectUserByUserNameAndPassword(userName, password);
            if (user != null)
            {
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<UserModel>(user, new JsonMediaTypeFormatter())
                };
            }
            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // POST: api/User
       [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]UserModel value)
        {
            bool insertResult = false;

            ////ModelState is the parameter that we got to the Post function (value in our case)
            //if (ModelState.IsValid)
           {
                insertResult = UserManager.InsertUser(value);
           }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/User/5
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Put(int id, [FromBody]UserModel value)
        {
            bool updateResult = false;

            //ModelState is the parameter that we got to the Post function (value in our case)
            if (ModelState.IsValid)
            {
                updateResult = UserManager.UpdateUserByUserId(id, value);
            }

            HttpStatusCode responseCode = updateResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };
        }
        // DELETE: api/User/5
        [BasicAuthFilter]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage Delete(int userId)
        {
            bool deleteResult = UserManager.DeleteUser(userId);

            HttpStatusCode responseCode = deleteResult ? HttpStatusCode.OK : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(deleteResult, new JsonMediaTypeFormatter()) };
        }
    }

        
}

