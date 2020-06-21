using HAK2.Interfaces;
using HAK2.Models;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HAK2.Services
{
    public class FakeDataService : IFakeDataService
    {
        private readonly IMemoryCache MemoryCache;

        public FakeDataService(IMemoryCache memoryCache)
        {
            MemoryCache = memoryCache;
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            LoadDataToCache();
        }

        public List<T> GetDataSet<T>() where T : class
        {
            return MemoryCache.Get<List<T>>(typeof(T));
        }

        private void LoadDataToCache()
        {
            var dgtuSpec = JsonConvert.DeserializeObject<List<DgtuSpec>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\dgtu_spec.json")));
            MemoryCache.Set(typeof(DgtuSpec), dgtuSpec, DateTimeOffset.MaxValue);

            var educationProgram = JsonConvert.DeserializeObject<List<EducationalProgramInfo>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\educationalPrograms.json")));
            MemoryCache.Set(typeof(EducationalProgramInfo), educationProgram, DateTimeOffset.MaxValue);

            var naukametria = JsonConvert.DeserializeObject<List<Naukametria>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\naukametria.json")));
            MemoryCache.Set(typeof(Naukametria), naukametria, DateTimeOffset.MaxValue);

            var universityStatistic = JsonConvert.DeserializeObject<List<University>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\Universities.json")));
            MemoryCache.Set(typeof(University), universityStatistic, DateTimeOffset.MaxValue);

            var statisticOfYears = JsonConvert.DeserializeObject<List<YearStatistic>>(System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Data\\Vuz_Statistic.json"), Encoding.GetEncoding(1251)));
            MemoryCache.Set(typeof(YearStatistic), statisticOfYears, DateTimeOffset.MaxValue);
        }
    }
}
