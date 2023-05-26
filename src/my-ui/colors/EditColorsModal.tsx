import { hslColorContrastGenerator, hslObjectToString } from "@/utils/helpers/hsl";
import { X } from "lucide-react";
import { useState } from "react";
import { ColorResult, PhotoshopPicker, SwatchesPicker } from "react-color";

interface EditColorsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateColor(color: ColorResult["hsl"]): void;
  color_to_edit: ColorResult["hsl"];
}

export function EditColorsModal({
  open,
  setOpen,
  color_to_edit,
  updateColor,
}: EditColorsModalProps) {
  const [color, setColor] = useState(color_to_edit);

  function handleChange(new_color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
    setColor(new_color.hsl);
    updateColor(new_color.hsl);
  }
  const hsl_string = hslObjectToString(color, true);

  if (!open)
    return ( null);

  return (
    <div onClick={(e) => { 
        e.stopPropagation();
        setOpen(false);
      }}
      className="fixed bottom-0 left-0 right-0 top-0 z-30 flex h-full w-full items-center 
      justify-center bg-slate-600 bg-opacity-60">
      <div 
        onClick={(e) => {e.stopPropagation();}}
        className="relative  flex items-center justify-center ">
        <div
          style={{backgroundColor: hsl_string}}
          className="rounded-lg flex h-full w-full flex-col items-center justify-center  gap-5 p-5">
                  <div
                      onClick={(e) => { setOpen(false); }}
                      className="absolute right-3 top-2 p-2 rounded-full hover:bg-red-800 flex items-center justify-center bg-slate-900">
                        <X size={20} />
                    </div>
          <div className="flex  w-full flex-wrap items-center justify-center gap-2 rounded ">
            <PhotoshopPicker color={color} onChange={handleChange} />
            <SwatchesPicker color={color} onChange={handleChange} />
          </div>
          <div className="w-full">
          <div className="rounded-lg bg-slate-900 p-3">{hslObjectToString(color)}</div>
          <div className="rounded-lg bg-slate-900 p-3">{
        }</div>
            </div>
        </div>
      </div>
    </div>
  );
}
