using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // tworzymy mapę <zJakiegoObiektu, naJaki>
            CreateMap<Activity, Activity>();
        }
    }
}
