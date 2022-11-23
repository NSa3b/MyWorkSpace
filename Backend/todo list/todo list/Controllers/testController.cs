using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace todo_list.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class testController : ControllerBase
    {
        [HttpGet]
        public string getAll()
        {
            return "welcome nahnoha!";
        }
    }
}
