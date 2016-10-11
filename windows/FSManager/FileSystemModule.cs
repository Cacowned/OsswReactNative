using System;
using System.IO;
using Windows.ApplicationModel.Core;
using Windows.Storage;
using Windows.UI.Core;
using ReactNative.Bridge;

namespace FSManager
{
    public class FileSystemModule : ReactContextNativeModuleBase
    {
        public FileSystemModule(ReactContext reactContext) : base(reactContext)
        {
        }

        public override string Name => "FSManager";

        [ReactMethod]
        public void readFile(string token, IPromise promise)
        {
            if (!Windows.Storage.AccessCache.StorageApplicationPermissions.FutureAccessList.ContainsItem(token))
            {
                promise.Reject("Access denied", "Access denied");
                return;
            }

            RunOnDispatcher(async () =>
            {
                try
                {
                    var file = await Windows.Storage.AccessCache.StorageApplicationPermissions.FutureAccessList.GetFileAsync(token);
                    var stream = await file.OpenSequentialReadAsync();
                    using (StreamReader sr = new StreamReader(stream.AsStreamForRead()))
                    {
                        var contents = await sr.ReadToEndAsync();
                        promise.Resolve(contents);
                    }
                }
                catch (Exception e)
                {
                    promise.Reject(e);
                }
            });
        }

        private static async void RunOnDispatcher(DispatchedHandler action)
        {
            await CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, action);
        }
    }
}
