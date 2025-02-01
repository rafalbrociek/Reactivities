﻿using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace Application.Activities
{
    // Activity - klasa, której dotyczy walidacja
    public class ActivityValidator : AbstractValidator<Activity> 
    {
        public ActivityValidator() 
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}
