using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FatStxUtilities
{
    public static class Utility
    {
        public static double ToUnixDateTime(this DateTime dateTime)
        {
            double ret = dateTime.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds;
            return ret;
        }

        public static string UnixDateTimeToIsoDateTime(double unixDateTime)
        {
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            string ret = dtDateTime.AddMilliseconds(unixDateTime).ToString("o", System.Globalization.CultureInfo.InvariantCulture);
            return ret;
        }
    }
}
