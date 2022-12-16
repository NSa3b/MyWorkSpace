using System.Collections.Generic;
using todo_list.Models;

namespace todo_list.DTO
{
    public class TaskDTO
    {
        public int? id { get; set; }
        public string name { get; set; }
        public bool? done { get; set; }
        public DateTime? date_added { get; set; }
        public int List_id { get; set; }
        public virtual List? List { get; set; }
    }
}
