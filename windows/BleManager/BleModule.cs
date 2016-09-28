using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Windows.ApplicationModel.Core;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.Advertisement;
using Windows.Devices.Bluetooth.GenericAttributeProfile;
using Windows.Devices.Enumeration;
using Windows.Media.Core;
using Windows.Security.Cryptography;
using Windows.Storage.Streams;
using Windows.UI.Core;
using Newtonsoft.Json.Linq;
using ReactNative.Bridge;
using ReactNative.Modules.Core;

namespace BleManager
{
    public class BleModule : ReactContextNativeModuleBase, ILifecycleEventListener
    {
        public BleModule(ReactContext reactContext) : base(reactContext)
        { }

        public override string Name => "BleManager";

        private readonly BluetoothLEAdvertisementWatcher watcher = new BluetoothLEAdvertisementWatcher();
        private BluetoothLEDevice connectedDevice;
        private readonly Dictionary<ulong, BlePeripheral> discoveredDevices = new Dictionary<ulong, BlePeripheral>();
        private Guid serviceUUID;


        public override void Initialize()
        {
            Context.AddLifecycleEventListener(this);

            watcher.Received += WatcherOnReceived;
        }

        [ReactMethod]
        public void scan(string serviceUUID, IPromise promise)
        {
            if (promise == null)
            {
                throw new ArgumentNullException(nameof(promise));
            }

            if (watcher.Status == BluetoothLEAdvertisementWatcherStatus.Started)
            {
                promise.Resolve(null);
            }

            //            RunOnDispatcher(async () =>
            //            {
            try
            {
                this.serviceUUID = Guid.Empty;
                if (!string.IsNullOrWhiteSpace(serviceUUID))
                {
                    this.serviceUUID = new Guid(serviceUUID);
                }

                //                    watcher.AdvertisementFilter = new BluetoothLEAdvertisementFilter
                //                    {
                //                        Advertisement = new BluetoothLEAdvertisement {ServiceUuids = {guid}}
                //                    };

                //                watcher.ScanningMode = BluetoothLEScanningMode.Passive;
                discoveredDevices.Clear();
                watcher.Start();

                //                    var result = await DeviceInformation.FindAllAsync(BluetoothLEDevice.GetDeviceSelector());
                //
                //                    if (result.Count > 0)
                //                    {
                //                        foreach (var device in result)
                //                        {
                //                            var ble = await BluetoothLEDevice.FromIdAsync(device.Id);
                //                            SendEvent("BleManagerDiscoverPeripheral", ConvertBleDevice(ble));
                //                        }
                promise.Resolve(null);
                //                    }
                //                    else
                //                    {
                //                        promise.Reject("", "Is bluetooth on?");
                //                    }

            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
            //            });

        }

        [ReactMethod]
        public void stopScan(IPromise promise)
        {
            if (promise == null)
            {
                throw new ArgumentNullException(nameof(promise));
            }

            if (watcher.Status == BluetoothLEAdvertisementWatcherStatus.Stopped || watcher.Status == BluetoothLEAdvertisementWatcherStatus.Stopping)
            {
                promise.Resolve(null);
            }

            watcher.Stop();
        }
        
        private void WatcherOnReceived(BluetoothLEAdvertisementWatcher sender, BluetoothLEAdvertisementReceivedEventArgs args)
        {
            BlePeripheral peripheral;
            if (discoveredDevices.TryGetValue(args.BluetoothAddress, out peripheral))
            {
                peripheral.UpdateFromAdvertisement(args.Advertisement, args.RawSignalStrengthInDBm);
            }
            else
            {
                peripheral = BlePeripheral.FromAdvertisement(args);
                discoveredDevices.Add(args.BluetoothAddress, peripheral);
            }

            if (serviceUUID == Guid.Empty || peripheral.ServiceGuids.Contains(serviceUUID))
            {
                SendEvent("BleManagerDiscoverPeripheral", ConvertBleDevice(peripheral));
            }
        }

        [ReactMethod]
        public void read(string deviceId, string serviceUUID, string characteristicUUID, IPromise promise)
        {

        }

        [ReactMethod]
        public void connect(string deviceAdress, IPromise promise)
        {
            connectedDevice?.Dispose();

            RunOnDispatcher(async () =>
            {
                try
                {
                    connectedDevice = await BluetoothLEDevice.FromBluetoothAddressAsync(Utils.ToDeviceAddress(deviceAdress));
                    promise.Resolve(null);
                }
                catch (Exception ex)
                {
                    promise.Reject(ex);
                    throw;
                }
            });
        }

        private static JObject ConvertBleDevice(BlePeripheral device)
        {
            return new JObject
            {
                {"address", Utils.ToStringAddress(device.Address) },
                {"name", device.LocalName },
                {"state", "Disconnected" },
                {"rssi", device.RawSignalStrengthInDBm + "dBm"},
//                {"services", ConvertServices(device) }
            };
        }

        private static JArray ConvertServices(BlePeripheral device)
        {
            JArray result = new JArray();

            foreach (var gattDeviceService in device.ServiceGuids)
            {
//                result.Add(ConvertService(gattDeviceService));
            }

            return result;
        }

        private static JObject ConvertService(GattDeviceService service)
        {
            return new JObject
            {
                {"uuid", service.Uuid },
                {"characteristics", GetCharacteristics(service) },
            };
        }

        private static JArray GetCharacteristics(GattDeviceService service)
        {
            return new JArray(service.GetAllCharacteristics().Select(characteristic => new JObject
            {
                {"uuid", characteristic.Uuid },
                {"description", characteristic.UserDescription },
//                {"", characteristic. }
            }));
        }

        private static async void RunOnDispatcher(DispatchedHandler action)
        {
            await CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, action);
        }

        private void SendEvent(string eventName, JObject parameters)
        {
            Context.GetJavaScriptModule<RCTDeviceEventEmitter>().emit(eventName, parameters);
        }

        public void OnSuspend()
        {
            watcher.Stop();
            watcher.Received -= WatcherOnReceived;

            connectedDevice?.Dispose();
            connectedDevice = null;
        }

        public void OnResume()
        {
            watcher.Received += WatcherOnReceived;
        }

        public void OnDestroy()
        {
            watcher.Stop();
            watcher.Received -= WatcherOnReceived;

            connectedDevice?.Dispose();
            connectedDevice = null;
        }
    }
}
