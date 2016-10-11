using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace FilePickerManager
{
    static class JObjectExtensions
    {
        public static bool ContainsKey(this JObject obj, string key)
        {
            return ContainsKey<string, JToken>(obj, key);
        }

        private static bool ContainsKey<TKey, TValue>(
            IDictionary<TKey, TValue> d,
            TKey key)
        {
            return d.ContainsKey(key);
        }
    }
}
