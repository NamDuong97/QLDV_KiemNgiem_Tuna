using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;

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
                    Limit = 700,
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
                option.AddPolicy("KYTOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KYT", "KYT_L", "KYT_P");
                });
                option.AddPolicy("BLDOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "BLD_KN", "BLD_L", "BLD_NL", "BLD_TC");
                });
                option.AddPolicy("KNOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KN", "KN_L", "KN_P");
                });
                option.AddPolicy("KHTHOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KHTH", "KHTH_L", "KHTH_P");
                });
                option.AddPolicy("VTOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "VT", "VT_L", "VT_P");
                });
                option.AddPolicy("KETOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KET", "KET_L", "KET_P");
                });
                option.AddPolicy("KHTH_BLD_KN", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KET", "KET_L", "KET_P", "BLD_L", "BLD_KN", "BLD_NL", "BLD_TC",
                        "KN", "KN_L", "KN_P");
                });
                option.AddPolicy("BLD_KYT", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KYT", "KYT_L", "KYT_P", "BLD_L", "BLD_KN", "BLD_NL", "BLD_TC");
                });
                option.AddPolicy("BLD_KET", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "KET", "KET_L", "KET_P", "BLD_L", "BLD_KN", "BLD_NL", "BLD_TC");
                });
                option.AddPolicy("BLD_VT", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Role, "VT", "VT_L", "VT_P", "BLD_L", "BLD_KN", "BLD_NL", "BLD_TC");
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
