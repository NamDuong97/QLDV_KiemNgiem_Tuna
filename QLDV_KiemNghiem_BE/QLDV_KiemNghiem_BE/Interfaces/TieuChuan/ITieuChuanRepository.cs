using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITieuChuanRepository
    {
        Task<IEnumerable<TieuChuan>> GetTieuChuansAllAsync();
        Task<TieuChuan?> FindTieuChuanAsync(string maTieuChuan);
        Task<List<TieuChuan>?> FindTieuChuanByNameAsync(string tenTieuChuan);
        void CreateTieuChuanAsync(TieuChuan tieuChuan);
        void UpdateTieuChuanAsync(TieuChuan tieuChuan);
        void DeleteTieuChuanAsync(TieuChuan tieuChuan);
    }
}
