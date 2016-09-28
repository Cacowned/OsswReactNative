using System;
using System.Collections.Generic;
using System.Linq;
using Windows.Devices.Bluetooth.Advertisement;

namespace BleManager
{
    public class BlePeripheral
    {
        public string LocalName { get; private set; }

        public ulong Address { get; private set; }

        public IReadOnlyList<Guid> ServiceGuids { get; private set; }

        public short RawSignalStrengthInDBm { get; private set; }

        private BlePeripheral(BluetoothLEAdvertisement advertisement, ulong address, short rssi)
        {
            Address = address;
            UpdateFromAdvertisement(advertisement, rssi);
        }

        public void UpdateFromAdvertisement(BluetoothLEAdvertisement advertisement, short rawSignalStrengthInDBm)
        {
            if (!string.IsNullOrWhiteSpace(advertisement.LocalName) && string.IsNullOrWhiteSpace(LocalName))
            {
                LocalName = advertisement.LocalName;
            }

            ServiceGuids = advertisement.ServiceUuids.ToList();

            RawSignalStrengthInDBm = rawSignalStrengthInDBm;
        }

        public static BlePeripheral FromAdvertisement(BluetoothLEAdvertisementReceivedEventArgs args)
        {
            return new BlePeripheral(args.Advertisement, args.BluetoothAddress, args.RawSignalStrengthInDBm);
        }
    }
}
