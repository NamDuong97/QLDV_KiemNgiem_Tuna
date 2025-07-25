﻿using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauRepository
    {
        Task<PagedList<PhieuDangKyMauProcedure>> GetPhieuDangKyMauAllAsync(PhieuDangKyMauParam param);
        Task<PhieuDangKyMau?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau);
        PhieuDangKyMauThongKeDto? GetPhieuDangKyMauThongKe();
        Task<PhieuDangKyMau?> FindPhieuDangKyMauAsync(string maPhieuDangKyMau, bool track);
        Task<PhieuDangKyMau?> FindPhieuDangKyMauByPhieuDangKyAndMaDmMauAsync(string maPhieuDangKy, string maDmMau, bool c);
        Task <int> ProcessUpdateStatusObjecRelative(string maMau, int typeCancel, string message, string user);
        Task<int> ProcessUpdateStatusMauWhenBLDAction(string maPDK, string trangThaiId);
        Task<int> ProcessCancelMauByLDP(string maMau, string message, bool action, string user, string userId, string maKhoa);
        Task<int> CheckPhanCongAllMauInPDK(string maId, string maPhieuDangKy);
        Task<PhieuDangKyMauThongKeProcedure> GetThongKePhieuDangKyMauProcedure(string maMau);
        Task CreatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        void UpdatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        void DeletePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        Task<PhieuDangKyMau?> CheckExistPhieuDangKyMauAsync(string phieuDangKyMau, string phieuDangKy, bool checking);
    }
}
