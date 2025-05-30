using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace QLDV_KiemNghiem_BE
{
    public static class PublicFunc
    {
        public static string getTimeSystem()
        {
           return DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();  
        }

        public static string processString(string data)
        {
            string result = "";
            if (data.Contains("-"))
            {
                result = data.Split("-")[0].ToLower().Trim();
            }else
            {
                result = data.ToLower().Trim();
            }
            // Normalize: tách ký tự + dấu
            result = data.Normalize(NormalizationForm.FormD);
            // Regex: xóa các dấu (ký tự không phải chữ cái)
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            result = regex.Replace(result, "").Replace('đ', 'd');               
            return result;
        }
    }
}
