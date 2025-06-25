using System.Text;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace QLDV_KiemNghiem_BE.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureRateLimitingOptions(this IServiceCollection services)
        {
            var rateLimitRules = new List<RateLimitRule>
            {
                new RateLimitRule
                {
                    Endpoint = "*",
                    Limit = 200,
                    Period = "1h"
                },
                 new RateLimitRule
                 {
                    Endpoint = "*:/api/khachhang",
                    Limit = 10,
                    Period = "1m"
                 },
                 new RateLimitRule
                 {
                    Endpoint = "*:/api/nhanvien",
                    Limit = 3,
                    Period = "1m"
                 },
            };
            services.Configure<IpRateLimitOptions>(opt => {
                opt.GeneralRules =
            rateLimitRules;
            });
            services.AddSingleton<IRateLimitCounterStore,
            MemoryCacheRateLimitCounterStore>();
            services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
        }
        public static void ConfigureAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(option =>
            {
                option.AddPolicy("AdminOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("Role", "Admin");
                });

                option.AddPolicy("KTSA", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("Role", "KT,SALE");
                });
            });
        }
        public static void ConfigureSwaggerGen(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "QLDV_KiemNghiem API", Version = "v1" });
                // Thêm phần JWT Bearer Authorization
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Nhập JWT token vào đây:",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });
        }
        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration jwtSettings, byte[] Key)
        {
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Key),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ValidateLifetime = true, //Kiểm tra thời gian sống của token
                    ClockSkew = TimeSpan.Zero
                };
            });
        }
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowFrontend",policy =>
                {
                    policy.WithOrigins("http://localhost:5175")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials() // cho phép hub realtime kết nối
                            .WithExposedHeaders("X-Pagination"); // Cho phép truy cập header này từ trình duyệt
                });
            });
        }
        public static void ConfigureResponseCaching(this IServiceCollection services) =>services.AddResponseCaching();
        public static void ConfigureRedisCaching(this IServiceCollection services, string configuration) 
        => services.AddStackExchangeRedisCache(options =>
        {
                options.Configuration = configuration;
                options.InstanceName = "MyApp:";
        });
    }
}


// Chứa các cấu hình dịch vụ để gọi trong Program, tránh cho Program bị dài, phức tạp khó đọc
