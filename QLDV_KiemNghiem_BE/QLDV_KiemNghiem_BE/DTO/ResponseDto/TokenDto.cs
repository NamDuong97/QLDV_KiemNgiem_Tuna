﻿namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class TokenDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
