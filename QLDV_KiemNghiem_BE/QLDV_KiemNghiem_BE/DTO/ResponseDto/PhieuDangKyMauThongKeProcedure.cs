using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    [Keyless]
    public class PhieuDangKyMauThongKeProcedure
    {
        public int PTKQ {  get; set; } 
        public int PCNB { get; set; }
        public int LM {  get; set; }
        public int BCTD { get; set; }
        public int Complete { get; set; }
        
    }
}
