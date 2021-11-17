using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class Curso
    {
        [Key]
        public int CursoId { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        [DataType(DataType.Date), Display(Name = "Data de Início")]
        public string DataInicio { get; set; }

        [Required]
        [DataType(DataType.Date), Display(Name = "Data de Término")]
        public string DataTermino { get; set; }

        public int QtdAlunos { get; set; }

        [Required]
        public int CategoriaFk { get; set; }
        [ForeignKey("CategoriaFk")]
        public Categoria Categoria { get; set; }
    }
}
