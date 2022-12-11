﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace todo_list.Models
{
    [Table("Task")]
    public partial class Task
    {
        [Key]
        /*[DatabaseGenerated(DatabaseGeneratedOption.Identity)]*/
        public int task_id { get; set; }
        [Unicode(false)]
        public string name { get; set; }
        public bool? done { get; set; }
        [Column(TypeName = "date")]
        public DateTime? date_added { get; set; }
        public int List_id { get; set; }

        [ForeignKey("List_id")]
        [InverseProperty("Tasks")]
        public virtual List List { get; set; }
    }
}