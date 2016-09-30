using System;
using System.Collections.Generic;
using System.Linq;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.Advertisement;

namespace BleManager
{
    public class BlePeripheral
    {
        private List<Guid> serviceGuids;

        public string LocalName { get; private set; }
        public ulong Address { get; private set; }

        public IReadOnlyList<Guid> ServiceGuids => serviceGuids;

        public short RawSignalStrengthInDBm { get; private set; }

        private BlePeripheral(BluetoothLEAdvertisement advertisement, ulong address, short rssi)
        {
            Address = address;
            UpdateFromAdvertisement(advertisement, rssi);
        }

        private BlePeripheral(ulong address, string name, IEnumerable<Guid> uuids)
        {
            Address = address;
            LocalName = name;
            serviceGuids = new List<Guid>(uuids);
        }

        public void UpdateFromAdvertisement(BluetoothLEAdvertisement advertisement, short rawSignalStrengthInDBm)
        {
            if (!string.IsNullOrWhiteSpace(advertisement.LocalName) && string.IsNullOrWhiteSpace(LocalName))
            {
                LocalName = advertisement.LocalName;
            }

            serviceGuids = advertisement.ServiceUuids.ToList();

            RawSignalStrengthInDBm = rawSignalStrengthInDBm;
        }

        public static BlePeripheral FromAdvertisement(BluetoothLEAdvertisementReceivedEventArgs args)
        {
            return new BlePeripheral(args.Advertisement, args.BluetoothAddress, args.RawSignalStrengthInDBm);
        }

        public static BlePeripheral FromLEDevice(BluetoothLEDevice connectedDevice)
        {
            return new BlePeripheral(connectedDevice.BluetoothAddress, connectedDevice.Name, connectedDevice.GattServices.Select(s=>s.Uuid));
        }
    }
}
