using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// globalnie wymuszanie autoryzacji dla wszystkich akcji kontrolerów w aplikacji.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

// u¿ycie metody rozszerzaj¹cej [Extensions/ApplicationsServiceExtensions.AddApplicationServices]
// rejestruj¹cej wszystkie serwisy
builder.Services.AddApplicationServices(builder.Configuration);

// dodanie serwisu odnoœnie autentykacji, rejestracji, logowania, etc
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// middleware z obs³ug¹ b³êdów powinien byæ na samej górze
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// dodanie polityki CORS
app.UseCors("CorsPolicy");

//app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    // utworzenie userManager
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();

    // za³adowanie danych do bazy - zobacz klasa Presistence/Seed
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
