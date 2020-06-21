using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using HAK2.Models;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Caching.Memory;
using System.Text;
using HAK2.Interfaces;

namespace HAK2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DGTUController : ControllerBase
    {
        private readonly IFakeDataService FakeDataService;
        public DGTUController(IFakeDataService fakeDataService)
        {
            FakeDataService = fakeDataService;
        }

        [Route("DgtuSpec")]
        [HttpGet]
        public dynamic DgtuSpec()
        {
            var data = FakeDataService.GetDataSet<DgtuSpec>();
            return data;
        }

        [Route("DgtuSpecAndNaukametria/{code}")]
        [HttpGet]
        public dynamic DgtuSpecAndNaukametria(string code)
        {
            var dgtuSpec = FakeDataService.GetDataSet<DgtuSpec>();
            var naukametria = FakeDataService.GetDataSet<Naukametria>();

            var result = new List<Naukametria>();

            foreach(var d in dgtuSpec.Where(w=>w.Code.Equals(code, StringComparison.CurrentCultureIgnoreCase)).ToList())
            {
                var naukametr = naukametria.Where(w => w.UGNP.StartsWith(d.Code)).Select(s=> { s.DgtuSpec = d; return s; }).ToList();
                result.AddRange(naukametr);
            }
            return result.GroupBy(f => f.UGNP).Select(s => new { GroupName = s.Key, GroupValues = s.Select(c => c) }).ToList();
        }

        [Route("EducationalProgram")]
        [HttpGet]
        public dynamic EducationalProgram()
        {
            var data = FakeDataService.GetDataSet<EducationalProgramInfo>();
            return data;
        }

        [Route("AllNaukametria/{ugnp?}")]
        [HttpGet]       
        public dynamic AllNaukametria(string ugnp = "")
        {
            var data = FakeDataService.GetDataSet<Naukametria>();

            if (string.IsNullOrEmpty(ugnp))
            {
                return data.GroupBy(f => f.UGNP).Select(s => new { GroupName = s.Key, GroupValues = s.Select(c => c) }).ToList();
            }
            return data.GroupBy(f => f.UGNP).Where(w => w.Key == ugnp).Select(s => new { GroupName = s.Key, GroupValues = s.Select(c => c) }).ToList();
            
        }

        [Route("UniversityStatistic")]
        [HttpGet]
        public dynamic UniversityStatistic()
        {
            var data = FakeDataService.GetDataSet<University>();            
            return data;
        }

        [Route("StatisticOfYear/{year?}")]
        [HttpGet]
        public dynamic StatisticOfYear(string year = "all")
        {
            var data = FakeDataService.GetDataSet<YearStatistic>();            
            var result =new List<UniversityInfoByYear>();

            foreach(var yearLine in year =="all" ?  data : data.Where(w=>w.Year.Equals(year, StringComparison.InvariantCultureIgnoreCase)).ToList() )
            {
                foreach(var un in yearLine.UniversitiesInfo)
                {
                    var unInfo = result.FirstOrDefault(f => f.University == un.University);
                    if(unInfo == null)
                    {
                        un.Year = yearLine.Year;
                        var info = new UniversityInfoByYear()
                        {
                            Id = Guid.NewGuid(),
                            University = un.University
                        };
                        info.UniversitiesInfo.Add(un);
                        result.Add(info);
                    }
                    else
                    {
                        if(!unInfo.UniversitiesInfo.Any(a=>a.Year == un.Year))
                        {
                            un.Year = yearLine.Year;
                            unInfo.UniversitiesInfo.Add(un);
                        }
                    }
                }
            }
            return result;
        }
    }
}
