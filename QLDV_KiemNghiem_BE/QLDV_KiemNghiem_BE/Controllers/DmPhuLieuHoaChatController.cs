using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Interfaces.ManagerInterface;
using QLDV_KiemNghiem_BE.Models;
using System.ComponentModel.DataAnnotations;

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

        [HttpPost]
        [Route("createDmPhuLieuHoaChat")]
        public async Task<ActionResult> createDmPhuLieuHoaChat(DmPhuLieuHoaChat dmPhuLieuHoaChat)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Loi validate du lieu dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool create = await _service.DmPhuLieuHoaChat.CreateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChat);
            if (create)
            {
                _logger.LogDebug("Tao danh muc phu lieu hoa chat thanh cong");
                return Ok(dmPhuLieuHoaChat);
            }
            else
            {
                _logger.LogDebug("Tao danh muc phu lieu hoa chat that bai");
                return BadRequest();
            }
        }


        [HttpPut]
        [Route("updateDmPhuLieuHoaChat")]
        public async Task<ActionResult> updateDmPhuLieuHoaChat(DmPhuLieuHoaChat dmPhuLieuHoaChat)
        {
            if (ModelState.IsValid)
            {
                var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
                _logger.LogDebug("Loi validate du lieu dau vao");
                return BadRequest(new { Errors = errors });
            }
            bool create = await _service.DmPhuLieuHoaChat.UpdateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChat);
            if (create)
            {
                _logger.LogDebug("Cap nhat danh muc phu lieu hoa chat thanh cong");
                return Ok(dmPhuLieuHoaChat);
            }
            else
            {
                _logger.LogDebug("Cap nhat danh muc phu lieu hoa chat that bai");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deleteDmPhuLieuHoaChat")]
        public async Task<ActionResult> deleteDmPhuLieuHoaChat(DmPhuLieuHoaChat dmPhuLieuHoaChat)
        {
           
            bool create = await _service.DmPhuLieuHoaChat.UpdateDmPhuLieuHoaChatAsync(dmPhuLieuHoaChat);
            if (create)
            {
                _logger.LogDebug("Cap nhat danh muc phu lieu hoa chat thanh cong");
                return Ok(dmPhuLieuHoaChat);
            }
            else
            {
                _logger.LogDebug("Cap nhat danh muc phu lieu hoa chat that bai");
                return BadRequest();
            }
        }
    }
}
