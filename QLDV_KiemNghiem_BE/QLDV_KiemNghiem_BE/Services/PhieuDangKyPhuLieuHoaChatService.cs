﻿using AutoMapper;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyPhuLieuHoaChatService : IPhieuDangKyPhuLieuHoaChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PhieuDangKyPhuLieuHoaChatService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<PhieuDangKyPhuLieuHoaChatDto> datas, Pagination pagi)> GetPhieuDangKyPhuLieuHoaChatAllAsync(PhieuDangKyPhuLieuHoaChatParam param)
        {
           var result = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatAllAsync(param);
            var dataReturn = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(result);
            return (datas: dataReturn, pagi: result.Pagination);
        }
        public async Task<List<PhieuDangKyPhuLieuHoaChatDto>?> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy)
        {
            if (maPhieuDangKy == null || maPhieuDangKy == "") return null;
            var phieuDangKyPhuLieuHoaChats = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(maPhieuDangKy);
            var result = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChats);
            return result;
        }
        public async Task<PhieuDangKyPhuLieuHoaChatDto?> GetPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC)
        {
            if (maPDKPLHC == null || maPDKPLHC == "") return null;
            var phieuDangKyPhuLieuHoaChats = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatAsync(maPDKPLHC, false);
            var result = _mapper.Map<PhieuDangKyPhuLieuHoaChatDto>(phieuDangKyPhuLieuHoaChats);
            return result;
        }
        public async Task<ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>> CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChatDto phieuDangKyPhuLieuHoaChat, string user)
        {
            var phieuDangKyPhuLieuHoaChatDomain = _mapper.Map<PhieuDangKyPhuLieuHoaChat>(phieuDangKyPhuLieuHoaChat);
            phieuDangKyPhuLieuHoaChatDomain.MaId = Guid.NewGuid().ToString();

            var checkExistPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(phieuDangKyPhuLieuHoaChat.MaPhieuDangKy);
            if (checkExistPDK == null)
            {
                return new ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>()
                {
                    KetQua = false,
                    Message = "Phieu dang ky chua plhc nay khong ton tai vui long kiem tra lai!"
                };  
            }
            checkExistPDK.NgaySua = DateTime.Now;
            checkExistPDK.NguoiSua = user;

            await _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChatDomain);
            await _repositoryManager.PhieuDangKy.CreatePhieuDangKyAsync(checkExistPDK);

            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuDangKyPhuLieuHoaChatDto>(phieuDangKyPhuLieuHoaChatDomain);
            return new ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>()
            {
                KetQua = false,
                Message = "Phieu dang ky chua plhc nay khong ton tai vui long kiem tra lai!",
                Data = dataReturn
            };
        }
        public async Task<ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>> UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChatDto phieuDangKyPhuLieuHoaChat, string user)
        {
            if(phieuDangKyPhuLieuHoaChat== null || phieuDangKyPhuLieuHoaChat.MaId == null || phieuDangKyPhuLieuHoaChat.MaId == "")
            {
                return new ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>()
                {
                    KetQua = true,
                    Message = "Thieu du lieu dau vao!",
                };
            }

            var checkPhieuDangKyPLHC = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.FindPhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChat.MaId, true);
            if(checkPhieuDangKyPLHC == null)
            {
                return new ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>()
                {
                    KetQua = true,
                    Message = "Phu lieu hoa chat can cap nhat khong ton tai!",
                };
            }

            var checkExistsPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(phieuDangKyPhuLieuHoaChat.MaPhieuDangKy);
            if(checkExistsPDK== null)
            {
                return new ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>()
                {
                    KetQua = true,
                    Message = "Phieu dang ky chua phu lieu hoa chat nay khong ton tai!",
                };
            }
            checkExistsPDK.NgaySua = DateTime.Now;
            checkExistsPDK.NguoiSua = user;

            _mapper.Map(phieuDangKyPhuLieuHoaChat, checkPhieuDangKyPLHC);
            _repositoryManager.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(checkPhieuDangKyPLHC);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(checkExistsPDK);

            bool check = await _repositoryManager.SaveChangesAsync();
            var dataReturn = _mapper.Map<PhieuDangKyPhuLieuHoaChatDto>(checkPhieuDangKyPLHC);

            return new ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>()
            {
                KetQua = check,
                Message = check ? "Cap nhat phu lieu hoa chat thanh cong" : "Cap nhat phu lieu hoa chat that bai",
                Data = dataReturn
            };
        }
        public async Task<bool> DeletePhieuDangKyPhuLieuHoaChatAsync(string maPhieuDangKyPhuLieuHoaChat, string user)
        {
            var checkPDKPLHC = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.FindPhieuDangKyPhuLieuHoaChatAsync(maPhieuDangKyPhuLieuHoaChat, true);
            if(checkPDKPLHC == null)
            {
                return false;
            }
            var checkExistsPDK = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(checkPDKPLHC?.MaPhieuDangKy ?? "");
            if (checkExistsPDK == null)
            {
                return false;
            }
            checkExistsPDK.NgaySua = DateTime.Now;
            checkExistsPDK.NguoiSua = user;
            _repositoryManager.PhieuDangKyPhuLieuHoaChat.DeletePhieuDangKyPhuLieuHoaChatAsync(checkPDKPLHC);
            _repositoryManager.PhieuDangKy.DeletePhieuDangKyAsync(checkExistsPDK);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }
    }
}
