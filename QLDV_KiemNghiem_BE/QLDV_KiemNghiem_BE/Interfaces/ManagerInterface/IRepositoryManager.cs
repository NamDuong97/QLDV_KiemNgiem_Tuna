namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IRepositoryManager
    {
        IPhieuDangKyRepository PhieuDangKy { get; }
        Task<bool> SaveChangesAsync();
    }
}
