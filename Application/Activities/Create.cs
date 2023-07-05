using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) 
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // nie używamy wersji asynchronicznej metody Add,
                // na tym etapie dodajemy aktywność do pamięci
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                // tak naprawdę nie zwracamy konkretnej wartości, tylko informujemy
                // że proces obsługi się zakończył
                return Unit.Value;
            }
        }
    }
}
