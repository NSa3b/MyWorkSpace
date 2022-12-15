using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_list.Models;
using todo_list.DTO;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace todo_list.Controllers
{
    [Route("api/[controller]")]  //api/Task
    [ApiController]
    public class TaskController : ControllerBase
    {
        MyWorkspaceContext db;
        private readonly IMapper mapper;
        private readonly ILogger logger;
        public TaskController(MyWorkspaceContext _db,IMapper _mapper, ILogger<TaskController> _logger)
        {
            this.db = _db;
            this.mapper = _mapper;
            this.logger = _logger;
        }
        

        //Get All

        [HttpGet]
        public ActionResult GetAll()
        {
            var allTasks = db.Tasks.ToList();
            var allTasksDTO = mapper.Map<List<TaskDTO>>(allTasks);
            return Ok(allTasksDTO);

        }

        //Get byID

        [HttpGet("{ID:int}")]
        public ActionResult GetbyId(int ID)
        {
            
            var task = db.Tasks.FirstOrDefault(s => s.id == ID);
            var taskDTO = mapper.Map<TaskDTO>(task);
            if(task == null)
            {
                return NotFound();
            }
            else
                return Ok(taskDTO);
           
        }

        //Get by List_ID

        [HttpGet("/api/grouptasks/{listid}", Name = "getTaskbyListId")]
        public ActionResult GetbyListId(int listid)
        {
            var task = db.Tasks.Where(m => m.List_id == listid).ToList();
            var taskDTO = mapper.Map<List<TaskDTO>>(task);
            if (task.Count == 0)
            {
                return NotFound();
            }
            else
                return Ok(taskDTO);

        }

        //Add task

        [HttpPost]
        public ActionResult Add(TaskDTO model)
        {
            if (model == null)
            {
                logger.LogError("model is null");
                return BadRequest("model is null");
            }
            if (!ModelState.IsValid)
            {
                logger.LogError("model not valid");
                return BadRequest("model not valid");
            }
            else
            {

                try
                {
                    model.date_added = DateTime.Now;
                    var entity = mapper.Map<Models.Task>(model);
                    db.Tasks.Add(entity);
                    db.SaveChanges();
                    var TasksbyListidDTO = mapper.Map<List<TaskDTO>>(db.Tasks.Where(m => m.List_id == entity.List_id).ToList());
                    return Created("task added!", TasksbyListidDTO);

                }

                catch
                {
                    return BadRequest("model not saved");
                }
            }

            
            
           

        }

        //Edit task

        [HttpPut]
        public ActionResult Edit(TaskDTO model)
        {
            if (ModelState.IsValid)
            {
                var entity = mapper.Map<Models.Task>(model);
                db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var TasksbyListidDTO = mapper.Map<List<TaskDTO>>(db.Tasks.Where(m => m.List_id == entity.List_id).ToList());
                db.SaveChanges();
                return Created("task edited!", TasksbyListidDTO);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        //Delete

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Models.Task entity=db.Tasks.FirstOrDefault(t=>t.id == id);
            if (entity == null)
            {
                return NotFound();
            }
            else
            {
                db.Tasks.Remove(entity);
                db.SaveChanges();
                var TasksbyListidDTO = mapper.Map<List<TaskDTO>>(db.Tasks.Where(m => m.List_id == entity.List_id).ToList());
                return Ok(TasksbyListidDTO);
            }
        }




       

      

    }
}
