using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.Devices.Bluetooth;
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
        }

        public override string Name => "BleManager";

        [ReactMethod]
        public void scan(string serviceUUID, bool allowDuplicates, IPromise promise)
        {
            if (promise == null)
            {
                throw new ArgumentNullException(nameof(promise));
            }



            RunOnDispatcher(async () =>
            {
                try
                {
                    Guid guid = GattServiceUuids.GenericAccess;
                    if (!string.IsNullOrWhiteSpace(serviceUUID))
                    {
                        guid = new Guid(serviceUUID);
                    }

                    var result = await DeviceInformation.FindAllAsync(GattDeviceService.GetDeviceSelectorFromUuid(guid));

                    if (result.Count > 0)
                    {
                        foreach (var device in result)
                        {
                            var ble = await BluetoothLEDevice.FromIdAsync(device.Id);
                            SendEvent("BleManagerDiscoverPeripheral", ConvertBleDevice(ble));
                        }
                        promise.Resolve(null);
                    }
                    else
                    {
                        promise.Reject("", "Is bluetooth on?");
                    }

                }
                catch (Exception ex)
                {
                    promise.Reject(ex);
                }
            });

        }

        private static JObject ConvertBleDevice(BluetoothLEDevice device)
        {
            return new JObject
            {
                {"DeviceId", device.DeviceId },
                {"Address", device.BluetoothAddress },
                {"Name", device.Name }
            };
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
