using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace QLDV_KiemNghiem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DmPhuLieuHoaChatController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly ILogger<DmPhuLieuHoaChatController> _logger;
        private readonly IMapper _mapper;
        public DmPhuLieuHoaChatController(IServiceManager serviceManager, ILogger<DmPhuLieuHoaChatController> logger, IMapper mapper)
        {
            _service = serviceManager;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getDmPhuLieuHoaChatAll")]
        public async Task<ActionResult> getDmPhuLieuHoaChatAll()
        {
            var dmPhuLieuHoaChat = await _service.DmPhuLieuHoaChat.GetDmPhuLieuHoaChatAllAsync();
            var result = _mapper.Map<IEnumerable<DmPhuLieuHoaChatDto>>(dmPhuLieuHoaChat);
            _logger.LogDebug("lay toan bo danh muc phu lieu hoa chat");
            return Ok(result);
        }


        [HttpGet]
        [Route("findDmPhuLieuHoaChat")]
        public async Task<ActionResult> findDmPhuLieuHoaChat(string id)
        {
            var dmPhuLieuHoaChat = await _service.DmPhuLieuHoaChat.GetDmPhuLieuHoaChatAllAsync();
            var result = _mapper.Map<IEnumerable<DmPhuLieuHoaChatDto>>(dmPhuLieuHoaChat);
            _logger.LogDebug("lay toan bo danh muc phu lieu hoa chat");
            return Ok(result);
        }

        [HttpPost]
        [Route("createDmPhuLieuHoaChat")]
        public async Task<ActionResult> createDmPhuLieuHoaChat(DmPhuLieuHoaChatRequestCreateDto dmPhuLieuHoaChat)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Loi validate du lieu dau vao");
                return BadRequest(new { Errors = errors });
            }
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<DmPhuLieuHoaChatDto> create = await _service.DmPhuLieuHoaChat.CreateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChat, user);
            if (create.KetQua)
            {
                _logger.LogDebug(create.Message);
                return Ok(create);
            }
            else
            {
                _logger.LogDebug(create.Message);
                return BadRequest(create);
            }
        }


        [HttpPut]
        [Route("updateDmPhuLieuHoaChat")]
        public async Task<ActionResult> updateDmPhuLieuHoaChat(DmPhuLieuHoaChatRequestUpdateDto dmPhuLieuHoaChat)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Loi validate du lieu dau vao");
                return BadRequest(new { Errors = errors });
            }
            var user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value.ToString();
            ResponseModel1<DmPhuLieuHoaChatDto> update = await _service.DmPhuLieuHoaChat.UpdateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChat, user);
            if (update.KetQua)
            {
                _logger.LogDebug(update.Message);
                return Ok(update);
            }
            else
            {
                _logger.LogDebug(update.Message);
                return BadRequest(update);
            }
        }

        [HttpDelete]
        [Route("deleteDmPhuLieuHoaChat")]
        public async Task<ActionResult> deleteDmPhuLieuHoaChat(string maDmPhuLieuHoaChat)
        {
           
            bool create = await _service.DmPhuLieuHoaChat.DeleteDmPhuLieuHoaChatAsync(maDmPhuLieuHoaChat);
            if (create)
            {
                _logger.LogDebug("Xoa danh muc phu lieu hoa chat thanh cong");
                return Ok("Xoa danh muc phu lieu hoa chat thanh cong");
            }
            else
            {
                _logger.LogDebug("Xoa danh muc phu lieu hoa chat that bai");
                return BadRequest("Xoa danh muc phu lieu hoa chat that bai");
            }
        }
    }
}
