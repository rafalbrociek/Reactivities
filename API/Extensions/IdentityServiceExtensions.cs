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

            // klucz do rozkodawania, musi by� taki sam jak klucz koduj�cy w TokenService
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    // jak chcemy walidowa� token
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        // sprawdzamy czy token jest ok - w przeciwnym razie akceptowany b�dzie ka�dy token (signed or unsigned)
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        // nie b�dziemy walidowa� tych rzeczy - robimy prosty przypadek
                        // gdyby to walidowa� nale�a�o by te informacje doda� do tokena wystawiaj�cego
                        // tylko sprawdzamy, czy token jest podpisany odpowiednim kluczem czy nie
                        // czy nadawca tokena ma by� walidowany
                        ValidateIssuer = false,
                        // czy odbiorca tokena ma by� walidowany
                        ValidateAudience = false
                    };
                });

            services.AddScoped<TokenService>();

            return services;
        }
    }
}