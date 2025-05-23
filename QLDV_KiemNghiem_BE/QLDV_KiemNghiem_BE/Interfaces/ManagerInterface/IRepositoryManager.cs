namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IRepositoryManager
    {
        IPhieuDangKyRepository PhieuDangKy { get; }
        IMauRepository Mau { get; }
        IDmPhuLieuHoaChatRepository DmPhuLieuHoaChat { get; }
        IPhieuDangKyPhuLieuHoaChatRepository PhieuDangKyPhuLieuHoaChat { get; }

        Task<bool> SaveChangesAsync();
    }
}
