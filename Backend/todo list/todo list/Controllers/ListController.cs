using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_list.Models;
using Microsoft.EntityFrameworkCore;

namespace todo_list.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        MyWorkspaceContext db;
        public ListController(MyWorkspaceContext _db)
        {
            this.db = _db;
        }


        //Get All

        [HttpGet]
        public ActionResult getAll()
        {
            return Ok(db.Lists.ToList());

        }


        //Get byID

        [HttpGet("{ID:int}")]
        public ActionResult getbyId(int ID)
        {
            var tasks = db.Lists.FirstOrDefault(s => s.List_id == ID);
            return Ok(tasks);
        }


        //Add List

        [HttpPost]
        public ActionResult add(List L)
        {
            if (L == null)
            {
                return BadRequest(ModelState);
            }
            else
            {
                db.Lists.Add(L);
                try
                {
                    db.SaveChanges();
                    return Created("new List added!", db.Lists.ToList());
                }
                catch
                {
                    return BadRequest();
                }
            }
        }

        //Edit List

        [HttpPut]
        public ActionResult edit(List L)
        {
            if (ModelState.IsValid)
            {
                db.Entry(L).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        //Delete

        [HttpDelete("{id}")]
        public ActionResult delete(int id)
        {
            List L = db.Lists.FirstOrDefault(l => l.List_id == id);
            if (L == null)
            {
                return NotFound();
            }
            else
            {
                db.Lists.Remove(L);
                db.SaveChanges();
                return Ok(db.Lists.ToList());
            }
        }
    }
}
