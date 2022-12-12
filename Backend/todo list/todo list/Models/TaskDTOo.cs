using System;
using System.Collections.Generic;

namespace todo_list.Models
{
    public class TaskDTO
    {
        public string name { get; set; }
        public bool? done { get; set; }
        public DateTime? date_added { get; set; }
        public int List_id { get; set; }
        public List List { get; set; }
    }
}