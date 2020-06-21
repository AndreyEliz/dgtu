using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HAK2.Models
{
    public class YearStatistic
    {
        public string Year { get; set; }

        public List<UniversityInfo> UniversitiesInfo { get;set;}
    }

    public class UniversityInfo
    {
        public int Id { get; set; }
        public string University { get; set; }

        public string City { get; set; }
        public string WorkHome { get; set; }
        public string MediumEge { get; set; }
        public string Nobel { get; set; }
        public string Olymp { get; set; }
        public string SelaryInMoscow { get; set; }

        public string Year { get; set; }
    }

    public class UniversityInfoByYear
    {
        public UniversityInfoByYear()
        {
            UniversitiesInfo = new List<UniversityInfo>();
        }
        public Guid Id { get; set; }
        public string University { get; set; }
        
        public List<UniversityInfo> UniversitiesInfo { get; private set; }
    }

    public class sdgfdf
    {
        public string University { get; set; }
    }
}
