using Domain;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // Activities to nazwa tabeli w bazie danych
        public DbSet<Activity> Activities { get; set; }
    }
}
