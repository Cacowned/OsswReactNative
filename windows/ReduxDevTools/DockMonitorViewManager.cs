using Windows.ApplicationModel.Core;
using Windows.UI;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Media;
using ReactNative.UIManager;
using ReactNative.UIManager.Annotations;

namespace ReduxDevTools
{
    public class DockMonitorViewManager : SimpleViewManager<Border>
    {
        public override string Name => "RCTDockMonitor";
        protected override Border CreateViewInstance(ThemedReactContext reactContext)
        {
            return new Border
            {
                Background = new SolidColorBrush(Colors.Aqua),
                ContextFlyout = new MenuFlyout(),
                
            };
        }

        [ReactProp("toggleVisibilityKey")]
        public void SetToggleVisibilityKey(Border view, string key)
        {
        }

        [ReactProp("changePositionKey")]
        public void SetChangePositionKey(Border view, string key)
        {

        }
    }
}
