using System.Text;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.AutoMapper;
using QLDV_KiemNghiem_BE.Extensions;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.Services;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.ConfigureCors();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped<IServiceManager, ServiceManager>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAutoMapper(op => op.AddProfile<MappingProfile>(),typeof(Program));
builder.Services.AddControllers(); // thay vì AddControllers()
builder.Services.AddControllers();
builder.Logging.AddDebug();   // Ghi ra Debug output
var jwtSettings = builder.Configuration.GetSection("Jwt"); // Cau hinh Jwt
var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
builder.Services.ConfigureAuthentication(jwtSettings, key);
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwaggerGen();
builder.Services.ConfigureAuthorization();
builder.Services.AddMemoryCache();
builder.Services.ConfigureRateLimitingOptions();
builder.Services.AddHttpContextAccessor();


var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseIpRateLimiting();

app.MapControllers();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "QLDV_KiemNghiem API V1");
        c.RoutePrefix = string.Empty; 
    });
}

app.Run();
