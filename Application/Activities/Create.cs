using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> // Unit oznacza, że nic nie zwracamy
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) 
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // nie używamy wersji asynchronicznej metody Add,
                // na tym etapie dodajemy aktywność do pamięci
                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync() > 0; //SaveChangesAsync zwraca liczbę uaktualnionych wierszy w bazie danych
                if (!result) return Result<Unit>.Failure("Failed to create activity");

                // tak naprawdę nie zwracamy konkretnej wartości, tylko informujemy
                // że proces obsługi się zakończył
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
