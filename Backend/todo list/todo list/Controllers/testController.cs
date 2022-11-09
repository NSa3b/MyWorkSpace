using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace todo_list.Controllers
{
    [Route("api/[controller]")]  //api/test(tooken replacemnet) ___________ {} parameter passed in curly braces
    [ApiController]
    public class testController : ControllerBase
    {
        [HttpGet]
        public string getall()
        {
            return "welcome nahnoha";
        }

    }
}
