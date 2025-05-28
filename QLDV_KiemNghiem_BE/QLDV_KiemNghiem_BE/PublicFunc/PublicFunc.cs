namespace QLDV_KiemNghiem_BE
{
    public static class PublicFunc
    {
        public static string getTimeSystem()
        {
           return DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();  
        }

    }
}
