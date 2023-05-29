import { ColorResult, HSLColor, SketchPicker, SwatchesPicker } from "react-color";
import { DialogWrapper } from "../../shadcn/DialogWrapper";
import { useState } from "react";
import { X } from "lucide-react";
import { hslObjectToStringtinyColor, hslStringToNewFormat } from "./colors";


interface ColorEditProps {
  color_key:string;
  value: string;
  bg_color: string;
  init_color: HSLColor;

  saveColor: () => void;
  setColors: (value: React.SetStateAction<{
    [x: string]: string;
  }>) => void
}

export function ColorEditble({ value, bg_color, init_color, saveColor,color_key,setColors }: ColorEditProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<HSLColor>(init_color);



  function handleChange(new_color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {

    setColor(new_color.hsl);
    const hsl_string = hslObjectToStringtinyColor(new_color.hsl);
    setColors((prev) => {
     return { ...prev, [color_key]: hsl_string };
    });

    const parsed_hsl = hslStringToNewFormat(hsl_string);
    if (typeof color_key === "string") {
      document.documentElement.style.setProperty(color_key, parsed_hsl);
    }
    saveColor();
  }
  //no,log("color  ==== ", color)
  const calculated_hsl_bg = hslObjectToStringtinyColor(color);
  return (
    <DialogWrapper
      open={open}
      trigger={
        <div
          onClick={() => setOpen(true)}
          className="h-full w-full cursor-pointer px-2 py-1 text-sm"
          style={{ backgroundColor: bg_color }}>
  
         <div className="bg-slate-900 w-fit rounded-xl px-2 p-1">{value}</div>
        </div>
      }>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-full w-full items-center 
        justify-center bg-slate-600 bg-opacity-60">
        <div className="relative flex items-center justify-center  ">
          <div
            onClick={(e) => {
              saveColor()
              setOpen(false);
            }}
            className="absolute right-3 top-2 flex cursor-pointer items-center justify-center rounded-full bg-slate-900 p-2 hover:bg-red-800">
            <X size={20} />
          </div>
          <div
            style={{ backgroundColor: calculated_hsl_bg }}
            className="flex h-full w-full flex-col items-center justify-center gap-5  rounded-lg p-5">
    
            <div className="flex w-full max-h-[70vh]  flex-wrap items-center justify-center gap-2 overflow-y-scroll rounded p-2 ">
              <SketchPicker color={color} onChange={handleChange} />
              <SwatchesPicker color={color} onChange={handleChange}/>
            </div>
              <div className="">
              <div className="rounded-lg bg-slate-900 p-3">
                {calculated_hsl_bg}
              </div>
   
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}
