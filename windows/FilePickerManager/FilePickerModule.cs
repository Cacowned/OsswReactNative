using System;
using System.Collections.Generic;
using System.Linq;
using Windows.ApplicationModel.Core;
using Windows.Storage.Pickers;
using Windows.UI.Core;
using Newtonsoft.Json.Linq;
using ReactNative.Bridge;

namespace FilePickerManager
{
    public class FilePickerModule : ReactContextNativeModuleBase
    {
        public FilePickerModule(ReactContext reactContext) : base(reactContext) { }

        public override string Name => "FilePickerManager";

        [ReactMethod]
        public void showFilePicker(JObject config, IPromise promise)
        {
            RunOnDispatcher(async () =>
            {
                var options = FilePickerOptions.FromJson(config);

                var fileOpenPicker = new FileOpenPicker
                {
                    ViewMode = options.ViewMode,
                };
                if (options.FileTypeFilter.Any())
                {
                    foreach (var filter in options.FileTypeFilter)
                    {
                        fileOpenPicker.FileTypeFilter.Add(filter);
                    }
                }
                var file = await fileOpenPicker.PickSingleFileAsync();
                if (file != null)
                {
                    var token = Windows.Storage.AccessCache.StorageApplicationPermissions.FutureAccessList.Add(file);
                    promise.Resolve(token);
                }
                else
                {
                    promise.Reject("cancelled", "cancelled");
                }
                
            });
        }

        private static async void RunOnDispatcher(DispatchedHandler action)
        {
            await CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, action);
        }

        class FilePickerOptions
        {
            private FilePickerOptions(PickerViewMode viewMode, IList<string> fileTypeFilter)
            {
                FileTypeFilter = fileTypeFilter;
                ViewMode = viewMode;
            }

            public IList<string> FileTypeFilter { get; }

            public PickerViewMode ViewMode { get; }

            public static FilePickerOptions FromJson(JObject json)
            {
                var fileTypeFilter = json.ContainsKey("fileTypeFilter") ? json.Value<string>("fileTypeFilter").Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries).ToList() : new List<string>();

                return new FilePickerOptions(GetViewMode(json), fileTypeFilter);
            }

            private static PickerViewMode GetViewMode(JObject config)
            {
                if (!config.ContainsKey("viewMode"))
                {
                    return PickerViewMode.List;
                }

                var viewMode = config.Value<string>("viewMode");
                switch (viewMode)
                {
                    case "list":
                        return PickerViewMode.List;
                    case "thumbnail":
                        return PickerViewMode.Thumbnail;
                    default:
                        throw new ArgumentException("Invalid pickerviewmode");
                }
            }
        }
    }
}
