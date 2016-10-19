using System;
using System.Collections.Generic;
using Windows.UI;
using Microsoft.Graphics.Canvas;
using Microsoft.Graphics.Canvas.UI.Xaml;
using Newtonsoft.Json.Linq;
using ReactNative.UIManager;
using ReactNative.UIManager.Annotations;

namespace OsswNative
{
    public class RCTWin2DCanvasManager : SimpleViewManager<CanvasControl>
    {
        private const int Invalidate = 1;
        private const int DrawLine = 2;
        private const int DrawRectangle = 3;

        public override string Name => "RCTWin2DCanvas";

        private readonly Queue<Action<CanvasDrawingSession>> drawingQueue = new Queue<Action<CanvasDrawingSession>>();

        public override IReadOnlyDictionary<string, object> CommandsMap => new Dictionary<string, object>
        {
            { "invalidate", Invalidate},
            { "drawLine", DrawLine },
            { "drawRectangle", DrawRectangle },
        };

        protected override CanvasControl CreateViewInstance(ThemedReactContext reactContext)
        {
            return new CanvasControl();
        }

        protected override void AddEventEmitters(ThemedReactContext reactContext, CanvasControl view)
        {
            view.Draw += CanvasControlOnDraw;
        }

        private void CanvasControlOnDraw(CanvasControl sender, CanvasDrawEventArgs args)
        {
            var canvas = args.DrawingSession;

            while (drawingQueue.Count > 0)
            {
                drawingQueue.Dequeue()(canvas);
            }
        }

        private void AddDrawLine(JArray args)
        {
            var x0 = args[0].Value<float>();
            var y0 = args[1].Value<float>();
            var x1 = args[2].Value<float>();
            var y1 = args[3].Value<float>();
            var color = args[4].Value<uint>();

            drawingQueue.Enqueue((canvas) => canvas.DrawLine(x0, y0, x1, y1, ColorHelpers.Parse(color)));
        }

        private void AddDrawRectangle(JArray args)
        {
            var x = args[0].Value<float>();
            var y = args[1].Value<float>();
            var width = args[2].Value<float>();
            var height = args[3].Value<float>();
            var color = args[4].Value<uint>();
            var fill = args.Count == 6 && args[5].Value<bool>();
            if (fill)
            {
                drawingQueue.Enqueue((canvas) => canvas.FillRectangle(x, y, width, height, ColorHelpers.Parse(color)));
            }
            else
            {
                drawingQueue.Enqueue((canvas) => canvas.DrawRectangle(x, y, width, height, ColorHelpers.Parse(color)));
            }
        }


        public override void ReceiveCommand(CanvasControl view, int commandId, JArray args)
        {
            switch (commandId)
            {
                case Invalidate:
                    view.Invalidate();
                    break;
                case DrawLine:
                    AddDrawLine(args);
                    break;
                case DrawRectangle:
                    AddDrawRectangle(args);
                    break;
            }
        }

        [ReactProp("clearColor")]
        public void SetClearColor(CanvasControl view, uint color)
        {
            view.ClearColor = ColorHelpers.Parse(color);
        }

        public override void OnDropViewInstance(ThemedReactContext reactContext, CanvasControl view)
        {
            view.Draw -= CanvasControlOnDraw;
        }
    }

    static class ColorHelpers
    {
        public const uint Transparent = 0x00FFFFFF;

        public static Color Parse(uint value)
        {
            var color = value;
            var b = (byte)color;
            color >>= 8;
            var g = (byte)color;
            color >>= 8;
            var r = (byte)color;
            color >>= 8;
            var a = (byte)color;
            return Color.FromArgb(a, r, g, b);
        }
    }
}
