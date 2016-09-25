using System;
using System.Collections.Generic;
using System.Linq;
using Windows.ApplicationModel.Core;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.Advertisement;
using Windows.Devices.Bluetooth.GenericAttributeProfile;
using Windows.Devices.Enumeration;
using Windows.Media.Core;
using Windows.UI.Core;
using Newtonsoft.Json.Linq;
using ReactNative.Bridge;
using ReactNative.Modules.Core;

namespace BleManager
{
    public class BleModule : ReactContextNativeModuleBase
    {
        public BleModule(ReactContext reactContext) : base(reactContext)
        {
            watcher = new BluetoothLEAdvertisementWatcher();
            watcher.Received += WatcherOnReceived;
        }

        public override string Name => "BleManager";

        private readonly BluetoothLEAdvertisementWatcher watcher;

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
                    Guid guid = GattServiceUuids.GenericAccess;
                    if (!string.IsNullOrWhiteSpace(serviceUUID))
                    {
                        guid = new Guid(serviceUUID);
                    }
                    
//                    watcher.AdvertisementFilter = new BluetoothLEAdvertisementFilter
//                    {
//                        Advertisement = new BluetoothLEAdvertisement {ServiceUuids = {guid}}
//                    };
                    
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
            SendEvent("BleManagerDiscoverPeripheral", new JObject
            {
                {"deviceId", "deviceId"},
                {"address", Utils.ToStringAddress(args.BluetoothAddress) },
                {"name", args.Advertisement.LocalName },
                {"state", "Disconnected" },
                {"rssi", args.RawSignalStrengthInDBm+"dBm"},
//                {"services", ConvertServices(device) }
            });
        }

        [ReactMethod]
        public void read(string deviceId, string serviceUUID, string characteristicUUID, IPromise promise)
        {

        }

        [ReactMethod]
        public void connect(string deviceId, IPromise promise)
        {
            RunOnDispatcher(async () =>
            {
                try
                {
                    var ble = await BluetoothLEDevice.FromIdAsync(deviceId);

                }
                catch (Exception ex)
                {
                    promise.Reject(ex);
                    throw;
                }
            });
        }

        private static JObject ConvertBleDevice(BluetoothLEDevice device)
        {
            return new JObject
            {
                {"deviceId", device.DeviceId },
                {"address", Utils.ToStringAddress(device.BluetoothAddress) },
                {"name", device.Name },
                {"state", device.ConnectionStatus.ToString() },
                {"rssi", "dBm"},
                {"services", ConvertServices(device) }
            };
        }

        private static JArray ConvertServices(BluetoothLEDevice device)
        {
            JArray result = new JArray();

            foreach (var gattDeviceService in device.GattServices)
            {
                result.Add(ConvertService(gattDeviceService));
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
    }
}
