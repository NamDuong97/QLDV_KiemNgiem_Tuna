﻿using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaChiTietRepository
    {
        Task<IEnumerable<PhieuPhanTichKetQuaChiTiet>> GetPhieuPhanTichKetQuaChiTietsAllAsync();
        Task<PhieuPhanTichKetQuaChiTiet?> FindPhieuPhanTichKetQuaChiTietAsync(string maPhieuPhanTichKetQuaChiTiet);
        Task<List<PhieuPhanTichKetQuaChiTiet>?> FindPhieuPhanTichKetQuaChiTietByMaPPTKQAsync(string maPPTKQ, bool track);
        void CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
        void UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
        void DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
    }
}
