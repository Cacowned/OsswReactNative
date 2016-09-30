using System;
using System.Collections.Generic;
using System.Linq;
using Windows.ApplicationModel.Core;
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.Advertisement;
using Windows.Devices.Bluetooth.GenericAttributeProfile;
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

            try
            {
                this.serviceUUID = Guid.Empty;
                if (!string.IsNullOrWhiteSpace(serviceUUID))
                {
                    this.serviceUUID = new Guid(serviceUUID);
                }

                discoveredDevices.Clear();
                watcher.Start();

                promise.Resolve(null);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
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

        [ReactMethod]
        public void read(string deviceAddress, string serviceUUID, string characteristicUUID, IPromise promise)
        {
            RunOnDispatcher(async () =>
            {
                if (connectedDevice != null && connectedDevice.BluetoothAddress == Utils.ToDeviceAddress(deviceAddress))
                {
                    var service = connectedDevice.GetGattService(new Guid(serviceUUID));
                    if (service != null)
                    {
                        var characteristic = service.GetCharacteristics(new Guid(characteristicUUID));
                        var result = await characteristic.First().ReadValueAsync();

                        if (result.Status == GattCommunicationStatus.Success)
                        {
                            byte[] data = new byte[result.Value.Length];
                            DataReader.FromBuffer(result.Value).ReadBytes(data);
                            
                            promise.Resolve(new JObject
                            {
                                // Hack to prevent byte array to be serialized as base64 string
                                { "value",new JArray(data.Select(b=>(short)b).ToArray())}
                            });
                        }
                        else
                        {
                            promise.Reject("READ_FAILED", "Could not read characteristic");
                        }
                    }
                }
                else
                {
                    promise.Reject("PERIPHERAL_NOT_FOUND", "Peripheral not found");
                }
            });
        }

        [ReactMethod]
        public void connect(string deviceAdress, IPromise promise)
        {
            connectedDevice?.Dispose();

            RunOnDispatcher(async () =>
            {
                try
                {
                    ulong address = Utils.ToDeviceAddress(deviceAdress);

                    connectedDevice = await BluetoothLEDevice.FromBluetoothAddressAsync(address);

                    if (!discoveredDevices.ContainsKey(address))
                    {
                        BlePeripheral peripheral = BlePeripheral.FromLEDevice(connectedDevice);
                        discoveredDevices.Add(address, peripheral);
                    }

                    promise.Resolve(null);
                }
                catch (Exception ex)
                {
                    promise.Reject(ex);
                    throw;
                }
            });
        }

        [ReactMethod]
        public void disconnect(string deviceAddress, IPromise promise)
        {
            if (connectedDevice != null && connectedDevice.BluetoothAddress == Utils.ToDeviceAddress(deviceAddress))
            {
                connectedDevice.Dispose();
                connectedDevice = null;
                promise.Resolve(null);
            }
            else
            {
                promise.Reject("PERIPHERAL_NOT_FOUND", "Peripheral not found");
            }
        }

        [ReactMethod]
        public void getServices(string deviceAddres, IPromise promise)
        {
            if (connectedDevice != null && connectedDevice.BluetoothAddress == Utils.ToDeviceAddress(deviceAddres))
            {
                promise.Resolve(connectedDevice.GattServices.ToList());
            }
            else
            {
                promise.Reject("PERIPHERAL_NOT_FOUND", "Peripheral not found");
            }
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
