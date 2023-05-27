import { useEffect, useState } from "react";
import { colorArrayToString, copyToClipboard, cssVariablesToJson, getcolorObjANdColorString } from "./helpers";
import { hslObjectToStringtinyColor, hslStringToNewFormat, hslStringToObjectTinyColor, hslStringToValidHsl } from "./colors";
import { DialogWrapper } from "../../shadcn/DialogWrapper";
import { ColorEditble } from "./ColorEdit";
import { ColorResult } from "react-color";
import { useNotificationStore } from "@/state/zustand/store";

interface ColorsFormProps {}

export function ColorsForm({}: ColorsFormProps) {
const {updateNotification }=useNotificationStore()
  const [color_variables, setColovariables] = useState(()=>{
    return localStorage.getItem("color_variables") || "";
  });

  const [color_json, setColors] = useState(cssVariablesToJson(color_variables));
  
  useEffect(() => {
    setColors(cssVariablesToJson(color_variables));
    if(color_variables && color_variables !== ""){
      localStorage.setItem("color_variables", color_variables);
    }
  },[color_variables])


function updateColor(color: ColorResult['hsl'], key: keyof typeof color_json,text:string) {
    const hsl_string = hslObjectToStringtinyColor(color);
    setColors(prev => {
       return { ...prev, [key]: hsl_string }
    })

  const parsed_hsl = hslStringToNewFormat(hsl_string);
  if(typeof key === "string"){
    document.documentElement.style.setProperty(key,parsed_hsl);
  }

  }





const colors_arr = Object.entries(color_json) as [keyof typeof color_json, string[]|string][];

return (
    <div className="flex h-full min-h-screen w-full flex-col  items-center justify-center gap-5 p-5">
      <div className="flex gap-3">
        <DialogWrapper

          trigger={
          <button 
          className="bg-secondary text-accent-foreground hover:bg-accent px-5 rounded-lg">
            Add variables</button>}>
          <textarea
            className="h-auto min-h-[500px]  w-full  rounded-md bg-slate-900  "
            value={color_variables}
            onChange={(e) => setColovariables(e.target.value)}
          />
        </DialogWrapper>

        <button 
          onClick={() => { copyToClipboard(colorArrayToString(colors_arr),updateNotification) }}
          className="bg-secondary text-accent-foreground hover:bg-accent px-5 rounded-lg">
          save and copy to clipboard
        </button>
      </div>

   
      <div className="flex w-full flex-wrap items-center justify-start gap-2 p-2">
        {colors_arr.map(([key, value]) => {
        const {color_obj,color_string}=getcolorObjANdColorString(value)
    
      return (
            <div
              key={key}
              style={{ borderColor: color_string }}
              className="flex w-[45%] flex-col items-center justify-center gap-1 rounded-lg border-4 lg:w-[24%]">
              <div className="w-full px-2 text-sm">{key}</div>

             <ColorEditble 
              value={color_string} 
              bg_color={color_string} 
              init_color={color_obj} 
               saveColor={() => localStorage.setItem("color_variables", colorArrayToString(colors_arr)) }
              updateColor={(color) => updateColor(color, key,colorArrayToString(colors_arr))}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
