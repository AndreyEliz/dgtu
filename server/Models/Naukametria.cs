using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HAK2.Models
{
    public class Naukametria
    {
        public string Number { get; set; }
        public string Name { get; set; }
        public string KeyWord { get; set; }
        public string Index { get; set; }
        public string GRNTI { get; set; }
        public string UGNP { get; set; }
        public string ProcentOfPublish { get; set; }
        public string FIO { get; set; }
        public string Kafedra { get; set; }
        public string Soavtor { get; set; }
        public string Group { get; set; }

        public DgtuSpec DgtuSpec { get; set; }
    }
}
