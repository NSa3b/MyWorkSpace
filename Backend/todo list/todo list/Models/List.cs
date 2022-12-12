﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;


namespace todo_list.Models
{
    [Table("List")]
    public partial class List
    {
        public List()
        {
            Tasks = new HashSet<Task>();
        }

        [Key]
        public int List_id { get; set; }
        [Unicode(false)]
        public string name { get; set; }
        [Required]
        [StringLength(50)]
        [Unicode(false)]
        public string color { get; set; }

        [InverseProperty("List")]
        [JsonIgnore]
        public virtual ICollection<Task> Tasks { get; set; }
    }
}