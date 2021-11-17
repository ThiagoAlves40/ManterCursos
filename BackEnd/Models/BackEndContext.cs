using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class BackEndContext : DbContext
    {
        public BackEndContext(DbContextOptions<BackEndContext> options) : base(options)
        { }

        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<Curso> Cursos { get; set; }
    }
}
