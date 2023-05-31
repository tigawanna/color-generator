import {
  ColorResult,
  CompactPicker,
  HSLColor,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
} from "react-color";
import { DialogWrapper } from "../../shadcn/DialogWrapper";
import { useState } from "react";
import { X } from "lucide-react";
import { hslObjectToStringtinyColor, hslStringToNewFormat } from "./colors";
import { getReadableColor, getcolorObjANdColorString, updateDocumentColorVariables } from "./helpers";

interface ColorEditProps {
  color_key: string;
  value: string;
  bg_color: string;
  init_color: HSLColor;
  theme: "light" | "dark"

  group_type: "foreground" | "primary" | "solo";
  saveColor: () => void;
  setColors: (
    value: React.SetStateAction<{
      [x: string]: string;
    }>
  ) => void;
  color_json: {
    [x: string]: string;
  };
  updateClass(k: string, v: string): void
}

export function ColorEditble({
  value,
  bg_color,
  init_color,
  saveColor,
  color_key,
  setColors,
  group_type,
  updateClass,
  theme,
  color_json,
}: ColorEditProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<HSLColor>(init_color);
  const [key, setColorKey] = useState(color_key);

  function handleChange(new_color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
    setColor(new_color.hsl);
    const hsl_string = hslObjectToStringtinyColor(new_color.hsl);
    setColors((prev) => {
      return { ...prev, [key]: hsl_string };
    });

    if (group_type === "primary") {
      const readable_color = hslObjectToStringtinyColor(getReadableColor(new_color.hsl));
      setColors((prev) => {
        return { ...prev, [key + "-foreground"]: readable_color };
      });
    }

    const parsed_hsl = hslStringToNewFormat(hsl_string);
    if (typeof key === "string") {
        updateDocumentColorVariables(parsed_hsl,theme, key);
    }
    console.log("parsed hsl  === ",parsed_hsl)

    saveColor();
  }

  const calculated_hsl_bg = hslObjectToStringtinyColor(color);
  const foreground = getcolorObjANdColorString(color_json[key + "-foreground"]);

  return (
    <DialogWrapper
      open={open}
      trigger={
        <div
          onClick={() => setOpen(true)}
          className=" flex cursor-pointer items-center justify-center p-1 text-xs hover:brightness-150 md:text-sm">
          <div className="w-full rounded-xl  p-1 px-2">{value}</div>
          <div style={{ backgroundColor: bg_color }} className="h-4 w-4 rounded-lg "></div>
        </div>
      }>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-full w-full items-center 
        justify-center bg-slate-900 bg-opacity-60 text-slate-50">
        <div className="relative flex items-center justify-center  ">
          <div
            onClick={(e) => {
              saveColor();
              document.documentElement.style.setProperty('--backgound',"182, 82%, 27%");
              setOpen(false);
            }}
            className="absolute right-3 top-2 flex cursor-pointer items-center justify-center rounded-full bg-slate-900 p-2 text-slate-50 hover:bg-red-800">
            <X size={20} />
          </div>
          <div
            style={{ backgroundColor: calculated_hsl_bg }}
            className="flex h-full w-full flex-col items-center justify-center gap-5  rounded-lg p-5">
            <div className="rounded-lg px-2 py-1">
              <div className="rounded-lg bg-slate-900 p-1 px-2 text-slate-50">
                {key} {" : "} {calculated_hsl_bg}
              </div>
              <div
                style={{ backgroundColor: calculated_hsl_bg }}
                className="h-3 bg-slate-900 text-slate-50">
                {" "}
              </div>
            </div>
            <div className="hidden max-h-[70vh] w-full flex-wrap  items-center justify-center gap-2 overflow-y-scroll rounded p-2 md:flex ">
              <SketchPicker color={color} onChange={handleChange} />
              <SwatchesPicker color={color} onChange={handleChange} />
            </div>

            <div className="flex  flex-col gap-2 md:hidden">
              <CompactPicker color={color} onChange={handleChange} />
            </div>
            <div className="w-full">
              <SliderPicker color={color} onChange={handleChange} />
            </div>

            <div className="flex gap-3">
              {group_type === "primary" && (
                <div className="flex flex-col gap-1 rounded-lg px-2 py-1">
                  <div className="rounded-lg bg-slate-900 p-1 px-2 text-slate-50">
                    {key + "-foreground"} {" : "}
                    {foreground.color_string}
                  </div>
                  <div
                    style={{ backgroundColor: foreground.color_string }}
                    className="h-3 bg-slate-900 text-slate-50">
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
