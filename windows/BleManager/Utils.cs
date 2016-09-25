using System.Globalization;
using System.Text.RegularExpressions;

namespace BleManager
{
    public static class Utils
    {
        public static string ToStringAddress(ulong address)
        {
            if (address == ulong.MinValue)
            {
                return string.Empty;
            }

            var macAddress = address.ToString("x012");
            var regex = "(.{2})(.{2})(.{2})(.{2})(.{2})(.{2})";
            var replace = "$1:$2:$3:$4:$5:$6";

            return Regex.Replace(macAddress, regex, replace);
        }

        public static ulong ToDeviceAddress(string address)
        {
            try
            {
                return ulong.Parse(address.Replace(":",""), NumberStyles.HexNumber);
            }
            catch
            {
                return ulong.MinValue;
            }
        }
    }
}
