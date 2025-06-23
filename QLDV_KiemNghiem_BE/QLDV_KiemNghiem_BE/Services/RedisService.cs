using Microsoft.Extensions.Caching.Distributed;
using QLDV_KiemNghiem_BE.Interfaces.Redis;
using StackExchange.Redis;
using System.ComponentModel;

namespace QLDV_KiemNghiem_BE.Services
{
    public class RedisService : IRedisService
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IDistributedCache _cache;
        public RedisService(IConnectionMultiplexer redis, IDistributedCache cache)
        {
            _redis = redis;
            _cache = cache;
        }
        public async Task RemoveCacheByPrefixAsync(string prefix)
        {
            var endpoints = _redis.GetEndPoints();
            var server = _redis.GetServer(endpoints[0]);
            var keys = server.Keys(pattern: $"{prefix}*").ToArray();

            foreach (var key in keys)
            {
                await _cache.RemoveAsync(key);
            }
        }

        public bool TryConnectRedis(string connectionString)
        {
            if (_redis.IsConnected)
            {
                return true;
            }
            return false;
        }
    }
}
