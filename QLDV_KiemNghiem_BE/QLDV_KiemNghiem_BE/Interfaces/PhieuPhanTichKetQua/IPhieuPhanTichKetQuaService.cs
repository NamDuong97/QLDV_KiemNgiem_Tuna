﻿using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaService
    {
        Task<(IEnumerable<PhieuPhanTichKetQuaProcedureDto> datas, Pagination pagi)> GetPhieuPhanTichKetQuaAllAsync(PhieuPhanTichKetQuaParam param);
        Task<PhieuPhanTichKetQuaProcedureDto?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestCreateDto PhieuPhanTichKetQuaDto, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestUpdateDto PhieuPhanTichKetQuaDto, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByLDP(RequestReviewPhieuPhanTichKetQua param, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByBLD(RequestReviewPhieuPhanTichKetQua param, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByCustomer(RequestReviewPhieuPhanTichKetQuaByCustomer param, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> DeletePhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua, string user);
    }
}
