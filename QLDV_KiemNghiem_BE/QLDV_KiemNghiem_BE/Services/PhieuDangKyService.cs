using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using System;

namespace QLDV_KiemNghiem_BE.Services
{
    public class PhieuDangKyService : IPhieuDangKyService
    {
        private readonly IRepositoryManager _repositoryManager;
        private IMapper _mapper;
        public PhieuDangKyService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam)
        {
            string makh, trangthaiID, from, to;
            DateTime temp = DateTime.Now;   
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            from = phieuDangKyParam.TimeFrom == "" ? "" : DateTime.TryParse(phieuDangKyParam.TimeFrom, out temp) ? phieuDangKyParam.TimeFrom : "";
            to = phieuDangKyParam.TimeTo == "" ? "" : DateTime.TryParse(phieuDangKyParam.TimeTo, out temp) ? phieuDangKyParam.TimeTo : "";
            makh = phieuDangKyParam.MaKH;
            trangthaiID = phieuDangKyParam.TrangThaiID;
            var phieuDangKies =  await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync(makh, trangthaiID, from, to); // lấy ra các phiếu đăng ký domain
            foreach (var item in phieuDangKies)
            {
                List<MauDto> mauDtos = new List<MauDto>(); // lưu những mẫu đã chuyển sang Dto
                var phieuDangKyPhuLieuHoaChatDomain = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(item.MaId);
                var phieuDangKyPhuLieuHoaChatDtos = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKyPhuLieuHoaChatDomain);
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                foreach (var mau  in item.Maus)
                {
                    var mauDto = _mapper.Map<MauDto>(mau);
                    mauDto.MauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(mau.MauHinhAnhs);
                    mauDtos.Add(mauDto);
                }
                phieuDangKyDto.Maus = mauDtos;
                phieuDangKyDto.PhieuDangKyPhuLieuHoaChats = phieuDangKyPhuLieuHoaChatDtos;
                phieuDangKyDtos.Add(phieuDangKyDto);
            }  
            return phieuDangKyDtos;
        }
        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy)
        {
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            var phieuDangKies = await _repositoryManager.PhieuDangKy.GetPhieuDangKiesOfCustomerAsync(maKH, maTrangThaiPhieuDangKy);
            foreach (var item in phieuDangKies)
            {
                List<MauDto> mauDtos = new List<MauDto>(); // lưu những mẫu đã chuyển sang Dto
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                foreach (var mau in item.Maus)
                {
                    var mauDto = _mapper.Map<MauDto>(item);
                    mauDto.MauHinhAnhs = _mapper.Map<List<PhieuDangKyMauHinhAnhDto>>(mau.MauHinhAnhs);
                    mauDtos.Add(mauDto);
                }
                phieuDangKyDto.Maus = mauDtos;
                phieuDangKyDto.PhieuDangKyPhuLieuHoaChats = (IEnumerable<PhieuDangKyPhuLieuHoaChatDto>)await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(item.MaId);
                phieuDangKyDtos.Add(phieuDangKyDto);
            }
            return phieuDangKyDtos;
        }
        public async Task<PhieuDangKyDto?> FindPhieuDangKyAsync(string maPhieuDangKy)
        {
            var phieuDangKy = await _repositoryManager.PhieuDangKy.FindPhieuDangKyAsync(maPhieuDangKy);
            var phieuDangKyPhuLieuHoaChatDto = await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(maPhieuDangKy);
            if (phieuDangKy == null) return null;
            var result = _mapper.Map<PhieuDangKyDto>(phieuDangKy);
            result.Maus = _mapper.Map<List<MauDto>>(phieuDangKy.Maus);
            result.PhieuDangKyPhuLieuHoaChats = (IEnumerable<PhieuDangKyPhuLieuHoaChatDto>)phieuDangKyPhuLieuHoaChatDto;
            return result;
        }
        public async Task<bool> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto)
        {
            PhieuDangKy phieuDangKyDomain = new PhieuDangKy();
            phieuDangKyDomain = _mapper.Map<PhieuDangKy>(phieuDangKyDto);
            _repositoryManager.PhieuDangKy.CreatePhieuDangKyAsync(phieuDangKyDomain);
            // Them danh sach mau vao CSDL
            foreach (var x in phieuDangKyDto.Maus)
            {
                Mau mauDomain = new Mau();
                mauDomain = _mapper.Map<Mau>(x);
                mauDomain.MaPhieuDangKy = phieuDangKyDomain.MaId;
                mauDomain.MaMau = mauDomain.TenMau + mauDomain.Madv + "-" + mauDomain.ThoiGianTieuChuan.ToString() + DateTime.Now.ToString();
                mauDomain.NgayTao = DateTime.Now;
                _repositoryManager.Mau.CreateMauAsync(mauDomain);
            }
            // Them danh sach plhc vao CSDL
            foreach (var x in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
            {
                var phieuDangKyPhuLieuHoaChatDomain = _mapper.Map<PhieuDangKyPhuLieuHoaChat>(x);
                _repositoryManager.PhieuDangKyPhuLieuHoaChat.CreatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChatDomain);
            }
            // Ghi vao CSDL
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto)
        {
            var phieuDangKyDomain = _mapper.Map<PhieuDangKy>(phieuDangKyDto);
            _repositoryManager.PhieuDangKy.UpdatePhieuDangKyAsync(phieuDangKyDomain);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy)
        {
            // Xoa cac mau co lien quan den phieu dang ky bi xoa
            _repositoryManager.PhieuDangKy.DeletePhieuDangKyAsync(phieuDangKy);
            bool check = await _repositoryManager.SaveChangesAsync();
            return check;
        }

        public async Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id)
        {
            return await _repositoryManager.PhieuDangKy.CheckExistPhieuDangKyAsync(id);
        }

        public async Task<int> DuTinhThoiGianKiemNghiem(string maTieuChuan)
        {
            var checkExistTieuChuan = await _repositoryManager.TieuChuan.FindTieuChuanAsync(maTieuChuan);
            if(checkExistTieuChuan == null)
            {
                return 0;
            }
            return await _repositoryManager.PhieuDangKy.DuTinhThoiGianKiemNghiem(maTieuChuan);
        }

    }
}
