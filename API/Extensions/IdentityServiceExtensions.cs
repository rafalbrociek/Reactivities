using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
            IConfiguration config) 
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<DataContext> ();

            // klucz do rozkodawania, musi byæ taki sam jak klucz koduj¹cy w TokenService
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    // jak chcemy walidowaæ token
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        // sprawdzamy czy token jest ok - w przeciwnym razie akceptowany bêdzie ka¿dy token (signed or unsigned)
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        // nie bêdziemy walidowaæ tych rzeczy - robimy prosty przypadek
                        // gdyby to walidowaæ nale¿a³o by te informacje dodaæ do tokena wystawiaj¹cego
                        // tylko sprawdzamy, czy token jest podpisany odpowiednim kluczem czy nie
                        // czy nadawca tokena ma byæ walidowany
                        ValidateIssuer = false,
                        // czy odbiorca tokena ma byæ walidowany
                        ValidateAudience = false
                    };
                });

            services.AddScoped<TokenService>();

            return services;
        }
    }
}