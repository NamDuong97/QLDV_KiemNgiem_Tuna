using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using QLDV_KiemNghiem_BE.DTO;
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

        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAllAsync()
        {
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            var phieuDangKies =  await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync(); // lấy ra các phiếu đăng ký domain
            foreach (var item in phieuDangKies)
            {
                List<MauDto> mauDtos = new List<MauDto>(); // lưu những mẫu đã chuyển sang Dto
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                foreach (var mau  in item.Maus)
                {
                    var mauDto = _mapper.Map<MauDto>(item);
                    mauDto.MauHinhAnhs = _mapper.Map<List<MauHinhAnhDto>>(mau.MauHinhAnhs);
                    mauDtos.Add(mauDto);
                }
                phieuDangKyDto.Maus = mauDtos;
                phieuDangKyDto.PhieuDangKyPhuLieuHoaChats = (IEnumerable<PhieuDangKyPhuLieuHoaChatDto>) await _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(item.MaId);
                phieuDangKyDtos.Add(phieuDangKyDto);
            }  
            return phieuDangKyDtos;
        }
        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH)
        {
            List<PhieuDangKyDto> phieuDangKyDtos = new List<PhieuDangKyDto>(); // lưu những phiếu đăng ký đã chuyển sang Dto
            var phieuDangKies = await _repositoryManager.PhieuDangKy.GetPhieuDangKiesOfCustomerAsync(maKH);
            foreach (var item in phieuDangKies)
            {
                List<MauDto> mauDtos = new List<MauDto>(); // lưu những mẫu đã chuyển sang Dto
                var phieuDangKyDto = _mapper.Map<PhieuDangKyDto>(item);
                foreach (var mau in item.Maus)
                {
                    var mauDto = _mapper.Map<MauDto>(item);
                    mauDto.MauHinhAnhs = _mapper.Map<List<MauHinhAnhDto>>(mau.MauHinhAnhs);
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
            if (phieuDangKy == null) return null;
            var result = _mapper.Map<PhieuDangKyDto>(phieuDangKy);
            result.Maus = _mapper.Map<List<MauDto>>(phieuDangKy.Maus);
            result.PhieuDangKyPhuLieuHoaChats = _mapper.Map<List<PhieuDangKyPhuLieuHoaChatDto>>(phieuDangKy.PhieuDangKyPhuLieuHoaChats);
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
                mauDomain.MaMau = mauDomain.TenMau + mauDomain.Madv + DateTime.Now.ToString();
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
            // Them danh sach mau vao CSDL
            foreach (var x in phieuDangKyDto.Maus)
            {
                var mauDomain = _mapper.Map<Mau>(x);
                _repositoryManager.Mau.UpdateMauAsync(mauDomain);
            }
            // Them danh sach plhc vao CSDL
            foreach (var x in phieuDangKyDto.PhieuDangKyPhuLieuHoaChats)
            {
                var phieuDangKyPhuLieuHoaChatDomain = _mapper.Map<PhieuDangKyPhuLieuHoaChat>(x);
                _repositoryManager.PhieuDangKyPhuLieuHoaChat.UpdatePhieuDangKyPhuLieuHoaChatAsync(phieuDangKyPhuLieuHoaChatDomain);
            }
            // Ghi vao CSDL
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
