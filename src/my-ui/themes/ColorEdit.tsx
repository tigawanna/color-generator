import {
  ColorResult,
  HSLColor,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
} from "react-color";
import { DialogWrapper } from "../../shadcn/DialogWrapper";
import { useState } from "react";
import { X } from "lucide-react";
import { hslObjectToStringtinyColor, hslStringToNewFormat } from "./colors";
import { getReadableColor, getcolorObjANdColorString } from "./helpers";
import { Tooltipwrapper } from "../shared/Tooltipwrapper";


interface ColorEditProps {
  color_key: string;
  value: string;
  bg_color: string;
  init_color: HSLColor;

  group_type: "foreground" | "primary" | "solo";
  saveColor: () => void;
  setColors: React.Dispatch<React.SetStateAction<{
    [x: string]: string;
  }>>
  color_json: {
    [x: string]: string;
  };
}

export function ColorEditble({
  value,
  bg_color,
  init_color,
  saveColor,
  color_key,
  group_type,
  color_json,
  setColors
}: ColorEditProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<HSLColor>(init_color);





  function handleChange(
    new_color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setColor(new_color.hsl);
    const hsl_string = hslObjectToStringtinyColor(new_color.hsl);
    setColors((prev) => {
      return { ...prev, [color_key]: hsl_string };
    });
    // setJsonColor(key,hsl_string);

    if (group_type === "primary") {
      const readable_color = hslObjectToStringtinyColor(
        getReadableColor(new_color.hsl)
      );
      // setJsonColor(key + "-foreground", readable_color);
      setColors((prev) => {
        return { ...prev, [color_key + "-foreground"]: readable_color };
      });
    }

    const parsed_hsl = hslStringToNewFormat(hsl_string);
    if (typeof color_key === "string") {
      document.documentElement.style.setProperty(color_key, parsed_hsl);
    }
    saveColor();
  }

  const calculated_hsl_bg = hslObjectToStringtinyColor(color);
  const foreground = getcolorObjANdColorString(color_json[color_key + "-foreground"]);

  return (
    <DialogWrapper
      open={open}
      trigger={
        <div
          onClick={() => setOpen(true)}
          className="flex h-full cursor-pointer px-2 py-1 text-sm brightness-200 hover:brightness-150"
        >
          <div className="h-4 w-4">
            <Tooltipwrapper message={value}>
              <div
                style={{ backgroundColor: bg_color }}
                className="h-4 w-4 rounded-xl  p-1 px-2"
              ></div>
            </Tooltipwrapper>
          </div>
        </div>
      }
    >
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-full w-[90%] items-center 
        justify-center bg-slate-900 bg-opacity-60 text-slate-50"
      >
        <div className="relative flex items-center justify-center  ">
          <div
            onClick={(e) => {
              saveColor();
              setOpen(false);
            }}
            className="absolute right-[2%] top-2 flex cursor-pointer items-center justify-center rounded-full bg-slate-900 p-2 text-slate-50 hover:bg-red-800"
          >
            <X size={20} />
          </div>
          <div
            style={{ backgroundColor: calculated_hsl_bg }}
            className="flex h-full w-full flex-col items-center justify-center gap-5  rounded-lg p-5"
          >
            <div className="rounded-lg px-2 py-1">
              <div className="rounded-lg bg-slate-900 p-1 px-2 text-xs text-slate-50">
                {color_key} {" : "} {calculated_hsl_bg}
              </div>
              <div
                style={{ backgroundColor: calculated_hsl_bg }}
                className="h-3 bg-slate-900 text-slate-50"
              >
                {" "}
              </div>
            </div>
            <div className="flex max-h-[70vh] w-full  items-center justify-center gap-2 overflow-y-scroll rounded p-2 ">
              <SketchPicker color={color} onChange={handleChange} />
              <div className="hidden md:flex">
                <SwatchesPicker color={color} onChange={handleChange} />
              </div>
            </div>
            <div className="w-full">
              <SliderPicker color={color} onChange={handleChange} />
            </div>

            <div className="flex gap-3">
              {group_type === "primary" && (
                <div className="flex flex-col gap-1 rounded-lg px-2 py-1">
                  <div className="rounded-lg bg-slate-900 p-1 px-2 text-slate-50">
                    {color_key + "-foreground"} {" : "}
                    {foreground.color_string}
                  </div>
                  <div
                    style={{ backgroundColor: foreground.color_string }}
                    className="h-3 bg-slate-900 text-slate-50"
                  >
                    {" "}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}
