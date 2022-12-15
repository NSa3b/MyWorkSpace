using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_list.Models;
using todo_list.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace todo_list.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        MyWorkspaceContext db;
        private readonly IMapper mapper;
        private readonly ILogger logger;
        public ListController(MyWorkspaceContext _db, IMapper _mapper, ILogger<TaskController> _logger)
        {
            this.db = _db;
            this.mapper = _mapper;
            this.logger = _logger;
        }


        //Get All

        [HttpGet]
        public ActionResult GetAll()
        {
            var allLists = db.Lists.ToList();
            var allListsDTO = mapper.Map<List<ListDTO>>(allLists);
            return Ok(allListsDTO);

        }


        //Get byID

        [HttpGet("{ID:int}")]
        public ActionResult GetbyId(int ID)
        {
            
            var list = db.Lists.FirstOrDefault(s => s.id == ID);
            var listDTO = mapper.Map<ListDTO>(list);

            if (list == null)
            {
                return NotFound();
            }
            else
                return Ok(listDTO);
            
        }


        //Add List

        [HttpPost]
        public ActionResult Add(ListDTO model)
        {
            if (model == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("model not valid");
            }
            else
            {
                try
                {
                    var entity = mapper.Map<Models.List>(model);
                    db.Lists.Add(entity);
                    db.SaveChanges();
                    var allListsDTO = mapper.Map<List<ListDTO>>(db.Lists.ToList());
                    return Created("task added!", allListsDTO);
                }
                catch
                {
                    return BadRequest();
                }
            }
        }

        //Edit List

        [HttpPut]
        public ActionResult edit(ListDTO model)
        {
            if (ModelState.IsValid)
            {
                var entity = mapper.Map<Models.List>(model);
                db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                var allListsDTO = mapper.Map<List<ListDTO>>(db.Lists.ToList());
                return Created("task added!", allListsDTO);
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
            List entity = db.Lists.FirstOrDefault(l => l.id == id);
            if (entity == null)
            {
                return NotFound();
            }
            else
            {
                db.Lists.Remove(entity);
                db.SaveChanges();
                var allListsDTO = mapper.Map<List<ListDTO>>(db.Lists.ToList());
                return Ok(allListsDTO);
            }
        }
    }
}
