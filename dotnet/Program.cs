using FileHelpers;
using System;
namespace FatStxUtilities
{
    [DelimitedRecord(",")]
    public class BinanceDaily
    {
        public string? XactnId;
        public decimal Price;
        public decimal Amount;
        public string? Field4;
        public string? Field5;
        public double UnixDate;
        public string? Field7;
        public string? Field8;
    }
    class Program
    {
        static void Main(string[] args)
        {
            string output = new ProcessFiles().ProcessBinanceDailySTXUSDT(@"C:\MyData\FatStxUtilities\STXPrices\", new DateTime(2022, 1, 1), new DateTime(2022, 1, 20));
            Console.WriteLine(output);
        }
    }
}