﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using System.Security.Claims;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuPhieuDeXuatPhongBanController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuPhieuDeXuatPhongBanController> _logger;
        private readonly IMapper _mapper;
        public PhieuPhieuDeXuatPhongBanController(IServiceManager serviceManager, ILogger<PhieuPhieuDeXuatPhongBanController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getPhieuPhieuDeXuatPhongBanAll")]
        public async Task<ActionResult> getPhieuPhieuDeXuatPhongBanAll([FromQuery]PhieuDeXuatPhongBanParam param)
        {
            var result = await _service.PhieuDeXuatPhongBan.GetPhieuDeXuatPhongBansAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get toan bo de xuat phong ban");
            return Ok(result.datas);
        }

        [HttpGet]
        [Route("getPhieuPhieuDeXuatPhongBanByID")]
        public async Task<ActionResult> getPhieuPhieuDeXuatPhongBanByID(string maPhieuPhieuDeXuatPhongBan)
        {
            var result = await _service.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(maPhieuPhieuDeXuatPhongBan);
            _logger.LogDebug("lay de xuat phong ban can tim: " + maPhieuPhieuDeXuatPhongBan);
            return Ok(result);
        }

        [HttpPost]
        [Route("createPhieuPhieuDeXuatPhongBan")]
        public async Task<ActionResult> createPhieuPhieuDeXuatPhongBan(PhieuDeXuatPhongBanRequestCreateDto PhieuDeXuatPhongBanDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            ResponseModel1<PhieuDeXuatPhongBanDto> create = await _service.PhieuDeXuatPhongBan.CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto, user);
            if (create.KetQua)
            {
                _logger.LogDebug(create.Message);
                return Ok(create.Data);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest(create.Message);
            }
        }

        [HttpPut]
        [Route("updatePhieuDeXuatPhongBan")]
        public async Task<ActionResult> updatePhieuDeXuatPhongBan(PhieuDeXuatPhongBanRequestUpdateDto PhieuDeXuatPhongBanDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogError("Loi validate tham so dau vao");
                return BadRequest(new { Errors = errors });
            }
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString() ?? null;
            ResponseModel1<PhieuDeXuatPhongBanDto> update = await _service.PhieuDeXuatPhongBan.UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto, user, userId);
            if (update.KetQua)
            {
                _logger.LogDebug(update.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update.Message);
            }
        }

        [HttpDelete]
        [Route("deletePhieuPhieuDeXuatPhongBan")]
        public async Task<ActionResult> deletePhieuPhieuDeXuatPhongBan(PhieuDeXuatPhongBan PhieuPhieuDeXuatPhongBan)
        {
            var checkExists = await _service.PhieuDeXuatPhongBan.FindPhieuDeXuatPhongBanAsync(PhieuPhieuDeXuatPhongBan.MaId);
            if (checkExists != null)
            {
                bool delete = await _service.PhieuDeXuatPhongBan.DeletePhieuDeXuatPhongBanAsync(PhieuPhieuDeXuatPhongBan);
                if (delete)
                {
                    _logger.LogDebug("Cap nhat de xuat phong ban thanh cong");
                    return Ok(PhieuPhieuDeXuatPhongBan);
                }
                else
                {
                    _logger.LogDebug("Cap nhat de xuat phong ban that bai");
                    return BadRequest();
                }
            }
            else
            {
                _logger.LogDebug("de xuat phong ban khong ton tai");
                return BadRequest();
            }
        }
    }
}
