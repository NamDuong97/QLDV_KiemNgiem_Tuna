using System.Text;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.AutoMapper;
using QLDV_KiemNghiem_BE.Extensions;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.Redis;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.Services;
using StackExchange.Redis;
using Microsoft.AspNetCore.SignalR;
using QLDV_KiemNghiem_BE.HubsRealTime;
using QLDV_KiemNghiem_BE.Hubs;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.ConfigureCors();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped<IServiceManager, ServiceManager>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();


// Redis connection
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var configuration = builder.Configuration.GetConnectionString("Redis");
    return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddScoped<IRedisService, RedisService>();
builder.Services.AddAutoMapper(op => op.AddProfile<MappingProfile>(),typeof(Program));
builder.Services.AddControllers( config =>
    config.CacheProfiles.Add("120SecondsDuration", new CacheProfile{Duration =120})
); 
builder.Services.AddControllers();
builder.Services.AddSignalR(); 
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
builder.Services.ConfigureResponseCaching();
builder.Services.ConfigureRedisCaching(builder.Configuration?.GetConnectionString("Redis"));

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseResponseCaching();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseIpRateLimiting();

app.MapControllers();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapHub<NotificationHub>("/notify"); // <-- ánh xạ vào hub NotificationCustomerToEmployeeHub

app.Run();
