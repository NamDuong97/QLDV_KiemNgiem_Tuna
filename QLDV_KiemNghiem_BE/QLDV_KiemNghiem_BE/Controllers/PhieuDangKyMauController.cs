﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using StackExchange.Redis;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuDangKyMauController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<PhieuDangKyMauController> _logger;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private readonly IConnectionMultiplexer _redis;
        public PhieuDangKyMauController(IServiceManager serviceManager, ILogger<PhieuDangKyMauController> logger, IMapper mapper, IDistributedCache cache, IConnectionMultiplexer redis)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
            _redis = redis;
        }

        //[Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("getPhieuDangKyMauAll")]
        public async Task<ActionResult> getPhieuDangKyMauAll([FromQuery]PhieuDangKyMauParam param)
        {
            var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAllAsync(param);
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(result.pagi));
            _logger.LogDebug("get all nhan vien");
            return Ok(result.datas);
        }

        [Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("getPhieuDangKyMau")]
        public async Task<ActionResult> getPhieuDangKyMau(string maMau)
        {
            var result = await _service.PhieuDangKyMau.GetPhieuDangKyMauAsync(maMau);
            _logger.LogDebug($"get mau theo ma {maMau}");
            return Ok(result);
        }

        [Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("getPhieuDangKyMauThongKe")]
        public ActionResult getPhieuDangKyMauThongKe()
        {
            var result = _service.PhieuDangKyMau.GetPhieuDangKyMauThongKe();
            _logger.LogDebug($"get thong ke mau thanh cong");
            return Ok(result);
        }

        //[Authorize(Policy = "KHTH_BLD_KN")]
        [HttpGet]
        [Route("checkPhieuDangKyMauFromTable")]
        public async Task<ActionResult> checkPhieuDangKyMauFromTable(string maMau)
        {
            var result = await _service.PhieuDangKyMau.CheckPhieuDangKyMauFromTableProcedure(maMau);
            _logger.LogDebug($"get thong ke mau thanh cong");
            return Ok(result);
        }

        [Authorize(Policy = "KHTHOnly")]
        [HttpPost]
        [Route("createPhieuDangKyMau")]
        public async Task<ActionResult> createPhieuDangKyMau(PhieuDangKyMauDto mauDto)
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
            if(mauDto == null)
            {
                _logger.LogDebug("Thieu du lieu dau vao");
                return BadRequest("Thieu du lieu dau vao");
            }
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            ResponseModel1<PhieuDangKyMauDto> create = await _service.PhieuDangKyMau.CreatePhieuDangKyMauAsync(mauDto, user);
            if (create.KetQua)
            {
                _logger.LogDebug("Them mau thanh cong");
                return Ok(mauDto);
            }
            else
            {
                _logger.LogDebug("Them mau that bai");
                return BadRequest();
            }
        }

        [Authorize(Policy = "KHTHOnly")]
        [HttpPut]
        [Route("updatePhieuDangKyMau")]
        public async Task<ActionResult> updatePhieuDangKyMau(PhieuDangKyMauDto MauDto)
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
            ResponseModel1<PhieuDangKyMauDto> update = await _service.PhieuDangKyMau.UpdatePhieuDangKyMauAsync(MauDto, user);
            if (update.KetQua)
            {
                //if (_redis.IsConnected)
                //{
                //    // Xoa cache cu da co tren redis, va cap nhat du lieu moi cho cache phieudangkymau
                //    await _cache.RemoveAsync($"phieudangkymau:{update?.Data?.MaId}");
                //    await _cache.SetStringAsync($"phieudangkymau:{update?.Data?.MaId}", JsonConvert.SerializeObject(update?.Data), new DistributedCacheEntryOptions
                //    {
                //        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                //    });
                //    // Cap nhat version moi cho cache redis phieudangkymau:all
                //    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                //}
                _logger.LogDebug(update?.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update);
            }
        }

        //[Authorize(Policy = "KHTHOnly")]
        //[Authorize(Policy = "KHTHOnly")]
        [HttpPut]
        [Route("cancelPhieuDangKyMauByKHTHBLD")]
        public async Task<ActionResult> cancelPhieuDangKyMauByKHTHBLD(PhieuDangKyMauRequestCancelByKHTHDto MauDto)
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
            ResponseModel1<PhieuDangKyMauDto> cancel = await _service.PhieuDangKyMau.CancelPhieuDangKyMauByKHTH(MauDto, user);
            if (cancel.KetQua)
            {
                _logger.LogDebug(cancel?.Message);
                return Ok(cancel);
            }
            else
            {
                _logger.LogDebug(cancel.Message);
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("cancelPhieuDangKyMauByLDP")]
        public async Task<ActionResult> cancelPhieuDangKyMauByLDP(PhieuDangKyMauRequestCancelByLDPDto MauDto)
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
            ResponseModel1<PhieuDangKyMauDto> cancel = await _service.PhieuDangKyMau.CancelPhieuDangKyMauByLDP(MauDto, user, userId);
            if (cancel.KetQua)
            {
                _logger.LogDebug(cancel?.Message);
                return Ok(cancel);
            }
            else
            {
                _logger.LogDebug(cancel.Message);
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("reviewCancelPhieuDangKyMauByBLD")]
        public async Task<ActionResult> reviewCancelPhieuDangKyMauByBLD(PhieuDangKyMauRequestReviewCancelByBLDDto MauDto)
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
            ResponseModel1<PhieuDangKyMauDto> cancel = await _service.PhieuDangKyMau.ReviewCancelPhieuDangKyMauByBLD(MauDto, user, userId);
            if (cancel.KetQua)
            {
                _logger.LogDebug(cancel?.Message);
                return Ok(cancel);
            }
            else
            {
                _logger.LogDebug(cancel.Message);
                return BadRequest();
            }
        }

        [Authorize(Policy = "KHTHOnly")]
        [HttpDelete]
        [Route("deletePhieuDangKyMau")]
        public async Task<ActionResult> deletePhieuDangKyMau(string  maMau)
        { 
            var user = User.FindFirst(ClaimTypes.Email)?.Value.ToString() ?? "unknow";
            bool delete = await _service.PhieuDangKyMau.DeletePhieuDangKyMauAsync(maMau, user);
            if (delete)
            {
                //if (_redis.IsConnected)
                //{
                //    await _cache.RemoveAsync($"phieudangkymau:{maMau}");
                //    // Cap nhat version moi cho cache redis phieudangkymau:all
                //    await _cache.SetStringAsync("phieudangkymau:all:version", $"v{DateTime.UtcNow.Ticks}");
                //}
                _logger.LogDebug("Xoa mau thanh cong");
                return Ok();
            }
            else
            {
                _logger.LogDebug("Xoa mau that bai");
                return BadRequest();
            }
        }
    }
}
