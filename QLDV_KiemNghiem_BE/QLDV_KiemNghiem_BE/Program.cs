using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.AutoMapper;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.Services;

var builder = WebApplication.CreateBuilder(args);

//Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();

builder.Services.AddScoped<IServiceManager, ServiceManager>();

builder.Services.AddAutoMapper(op => op.AddProfile<MappingProfile>(),typeof(Program));

<<<<<<< HEAD
builder.Services.AddControllers(); // thay vì AddControllers()

var app = builder.Build();

//Configure the HTTP request pipeline. 
=======
builder.Services.AddControllers();

var app = builder.Build();

//Configure the HTTP request pipeline.
>>>>>>> fc6d0264aa04ba2547ac84d8521223587ec9cb6e

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllerRoute(
  name: "default",
  pattern: "{controller=Home}/{action=Index}/{id?}",
  defaults: new { controller = "Home", action = "Index" });

app.MapControllers();

app.Run();
