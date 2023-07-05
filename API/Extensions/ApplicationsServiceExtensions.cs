﻿using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationsServiceExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="services">rozszerzamy kolekcję serwisów ???? - przekazujemy metodzie obiekt services 
        /// i rozszerzamy go wewnątrz metody</param>
        /// <param name="config">przez ten obiekt będziemy mieć dostę do app.settings.json</param>
        /// <returns></returns>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            // dodanie polityki prywatności
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler));
            // serwis autoMappera
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
