using FileHelpers;


namespace FatStxUtilities
{
    public class ProcessFiles
    {
        public string ProcessBinanceDailySTXUSDT(string path,DateTime startDate,DateTime endDate)
        {
            string output = "";
            DateTime workingDateTime = startDate;

            while (workingDateTime <= endDate)
            {

                FileHelperEngine<BinanceDaily> fileHelperEngine = new();
                BinanceDaily[]? records = fileHelperEngine.ReadFile(path + GenerateBinanceDailyFileName("STXUSDT",workingDateTime));

                double workingUnixTime = workingDateTime.ToUnixDateTime();
                foreach (BinanceDaily record in records.OrderBy(a => a.UnixDate))
                {
                    if (workingUnixTime < record.UnixDate)
                    {
                        string dtDateTime1 = Utility.UnixDateTimeToIsoDateTime(record.UnixDate);
                        output += "{ date: '" + dtDateTime1 + "', coin: 'STX', price: '" + record.Price.ToString() + "'}," + Environment.NewLine;
                        workingUnixTime = workingUnixTime + 3600000;
                    }
                }
                workingDateTime = workingDateTime.AddDays(1);
            }
            return output;
        }

        private string GenerateBinanceDailyFileName(string pair,DateTime dateTime)
        {
            string ret = pair+ "-aggTrades-" + dateTime.ToString("yyyy-MM-dd") + ".csv";
            return ret;

        }
    }
}
