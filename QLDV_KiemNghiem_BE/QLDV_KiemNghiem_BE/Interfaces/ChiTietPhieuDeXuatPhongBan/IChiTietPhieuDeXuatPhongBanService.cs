﻿using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDeXuatPhongBanService
    {
        Task<IEnumerable<ChiTietPhieuDeXuatPhongBanDto>> GetChiTietPhieuDeXuatPhongBansAllAsync();
        Task<ChiTietPhieuDeXuatPhongBanDto?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan);
        Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto, string user);
        Task<ResponseReviewPhieuDeXuatPhongBan> ReviewPhieuDeXuatPhongBanByPhongKhoa(RequestReviewPhieuDeXuatPhongBan duyetPhieu, string user, string userId);
        Task<ResponseReviewPhieuDeXuatPhongBan> ReviewPhieuDeXuatPhongBanByBLD(RequestReviewPhieuDeXuatPhongBan duyetPhieu, string user, string userId);
        //Task<bool> CancelChiTietPhieuDeXuatPhongBansByKHTH(CancelChiTietPhieuDeXuatPhongBanRequestDto cancelPhieu, string user, string userId);
        Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto, string user);
        Task<bool> DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
    }
}
