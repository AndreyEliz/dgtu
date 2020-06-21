using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HAK2.Models
{
    public class University
    {
        public string Year { get; set; }

        public List<UniversityStatistic> UniversityInfo  { get;set;}
    }

    public class UniversityStatistic
    {
        public string University { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string EmployedGraduates { get; set; }
        public string TheShareOfFundsFrom { get; set; }

        public string CitationIndex { get; set; }
    }

    public class EducationalProgramInfo : UniversityStatistic
    {
        public string Year { get; set; }

        public string EducationalProgram { get; set; }
    }
}
