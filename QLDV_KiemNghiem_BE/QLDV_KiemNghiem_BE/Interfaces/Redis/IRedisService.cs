namespace QLDV_KiemNghiem_BE.Interfaces.Redis
{
    public interface IRedisService
    {
        Task RemoveCacheByPrefixAsync(string prefix);
    }
}
