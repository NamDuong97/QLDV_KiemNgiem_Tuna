﻿using System.ComponentModel.DataAnnotations;
namespace QLDV_KiemNghiem_BE.DTO.Parameter
{
    public class LoginDto
    {
        [Required(ErrorMessage ="Email is required")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

    }
}
