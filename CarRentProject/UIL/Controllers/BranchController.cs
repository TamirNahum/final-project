using BLL;
using BOL;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]

    public class BranchController : ApiController
    {
        // GET: api/Branch
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<BranchModel[]>(BranchesManager.SelectAllBranches(), new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Branch/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Branch
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Branch/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Branch/5
        public void Delete(int id)
        {
        }
    }
}
