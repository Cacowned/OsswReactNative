using System;
using System.Globalization;
using System.Text.RegularExpressions;
using Windows.Storage.Streams;

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

        public static IBuffer ToBuffer(this byte[] value)
        {
            return ToBuffer(value, value.Length);
        }

        public static IBuffer ToBuffer(this byte[] value, int length)
        {
            if (value == null || value.Length == 0)
            {
                throw new ArgumentException();
            }

            var temp = new byte[length];
            Array.Copy(value, 0, temp, 0, length);
            using (DataWriter writer = new DataWriter())
            {
                writer.WriteBytes(temp);
                var buffer = writer.DetachBuffer();
                return buffer;
            }
        }
    }
}
