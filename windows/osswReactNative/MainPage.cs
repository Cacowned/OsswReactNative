using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;
using BleManager;
using FilePickerManager;
using FSManager;

namespace osswReactNative
{
    class MainPage : ReactPage
    {
        public override string MainComponentName => "osswReactNative";

#if BUNDLE
        public override string JavaScriptBundleFile
        {
            get
            {
                return "ms-appx:///ReactAssets/index.windows.bundle";
            }
        }
#endif

        public override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new BleManagerPackage(),
            new FilePickerPackage(),
            new FileSystemPackage(),
        };

        public override bool UseDeveloperSupport => true;
    }

}
