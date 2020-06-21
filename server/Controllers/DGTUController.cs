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

namespace HAK2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DGTUController : ControllerBase
    {
        private readonly ILogger<DGTUController> _logger;
        public DGTUController(ILogger<DGTUController> logger)
        {
            _logger = logger;
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        }

        [Route("DgtuSpec")]
        [HttpGet]
        public dynamic DgtuSpec()
        {
            var data = JsonConvert.DeserializeObject<List<DgtuSpec>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\dgtu_spec.json")));
            return data;
        }

        [Route("DgtuSpecAndNaukametria/{code}")]
        [HttpGet]
        public dynamic DgtuSpecAndNaukametria(string code)
        {
            var dgtuSpec = JsonConvert.DeserializeObject<List<DgtuSpec>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\dgtu_spec.json")));
            var naukametria = JsonConvert.DeserializeObject<List<Naukametria>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\naukametria.json")));

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
            var data = JsonConvert.DeserializeObject<List<EducationalProgramInfo>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\educationalPrograms.json")));
            return data;
        }

        [Route("AllNaukametria/{ugnp?}")]
        [HttpGet]       
        public dynamic AllNaukametria(string ugnp = "")
        {
            var data = JsonConvert.DeserializeObject<List<Naukametria>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\naukametria.json")));

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
            var data = JsonConvert.DeserializeObject<List<University>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\Universities.json")));
            return data;
        }

        [Route("StatisticOfYear/{year?}")]
        [HttpGet]
        public dynamic StatisticOfYear(string year = "all")
        {
            var data = JsonConvert.DeserializeObject<List<YearStatistic>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\Vuz_Statistic.json"), Encoding.GetEncoding(1251)));
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
