﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_list.Models;
using Microsoft.EntityFrameworkCore;

namespace todo_list.Controllers
{
    [Route("api/[controller]")]  //api/Task
    [ApiController]
    public class TaskController : ControllerBase
    {
        MyWorkspaceContext db;
        public TaskController(MyWorkspaceContext _db)
        {
            this.db = _db;
        }

        //Get All

        [HttpGet]
        public ActionResult getAll()
        {
            return Ok(db.Tasks.ToList());

        }

        //Get byID

        [HttpGet("{ID:int}")]
        public ActionResult getbyId(int ID)
        {
            
            var task = db.Tasks.FirstOrDefault(s => s.task_id == ID);
            if(task == null)
            {
                return NotFound();
            }
            else
                return Ok(task);
           
        }

        //Get by List_ID

        [HttpGet("/api/grouptasks/{listid}")]
        public ActionResult getbyListId(int listid)
        {
            var task = db.Tasks.Where(m => m.List_id == listid).ToList();
            if (task.Count == 0)
            {
                return NotFound();
            }
            else
                return Ok(task);

        }

        //Add task

        [HttpPost]
        public ActionResult add(Models.Task T)
        {
            if (T==null)
            {
                return BadRequest(ModelState);
            }
            else
            {
                T.date_added= DateTime.Now;
                db.Tasks.Add(T);
                try
                {
                    var tasks = db.Tasks.Where(m => m.List_id == T.List_id).ToList();
                    db.SaveChanges();
                    return Created("task added!", tasks);
                }
                catch
                {
                    return BadRequest();
                }
            }
        }

        //Edit task

        [HttpPut]
        public ActionResult edit(Models.Task T)
        {
            if (ModelState.IsValid)
            {
                db.Entry(T).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var tasks = db.Tasks.Where(m => m.List_id == T.List_id).ToList();
                db.SaveChanges();
                return Created("task edited!", tasks);
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
            Models.Task T=db.Tasks.FirstOrDefault(t=>t.task_id == id);
            if (T == null)
            {
                return NotFound();
            }
            else
            {
                db.Tasks.Remove(T);
                db.SaveChanges();
                return Ok(db.Tasks.ToList());
            }
        }




       

      

    }
}
