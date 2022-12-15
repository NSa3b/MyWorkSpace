using AutoMapper;
using todo_list.DTO;
using todo_list.Models;

namespace todo_list.Mappers
{
    public class TodoListReadDTO:Profile
    {
        //Source --> Destination
        public TodoListReadDTO()
        {
            CreateMap<Models.Task,TaskDTO>().ReverseMap();
            CreateMap<Models.List, ListDTO>().ReverseMap();
        }
    }
}
