using HAK2.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HAK2.Interfaces
{
    public interface IFakeDataService
    {
        List<T> GetDataSet<T>() where T : class;
    }
}
