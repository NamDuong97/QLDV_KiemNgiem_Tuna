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
            var phieuDangKies =  await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAllAsync();
            var result =  _mapper.Map<List<PhieuDangKyDto>>(phieuDangKies);
            var phuLieuHoaChat = _repositoryManager.PhieuDangKyPhuLieuHoaChat.GetPhieuDangKyPhuLieuHoaChatAllAsync();
            return result;
        }

        public async Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAsync(string maKH)
        {
            var phieuDangKies = await _repositoryManager.PhieuDangKy.GetPhieuDangKiesAsync(maKH);
            var result = _mapper.Map<List<PhieuDangKyDto>>(phieuDangKies);
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
