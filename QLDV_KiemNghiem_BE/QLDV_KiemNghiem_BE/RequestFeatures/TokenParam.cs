namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class TokenParam
    {
        public string ID { get; set; }  = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role {  get; set; } = string.Empty;   
        public bool IsCustomer { get; set; } = true;
    }
}
