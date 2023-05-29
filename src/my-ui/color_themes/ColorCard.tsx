import { ColorEditble } from "./ColorEdit";
import { CSSVariableList, colorArrayToString } from "./helpers";


interface ColorCardProps {
color_key: string;
color_string: string;
color_obj: {
        h: number;
        s: number;
        l: number;
    }
colors_arr: CSSVariableList;
setColors: React.Dispatch<React.SetStateAction<{[x: string]: string;}>>
color_foreground:boolean;
}

export function ColorCard({color_obj,color_string,colors_arr,color_key,color_foreground,setColors}:ColorCardProps){
    
    // function updateColor(color: ColorResult["hsl"], key: string, text: string) {
    //     const hsl_string = hslObjectToStringtinyColor(color);
    //     setColors((prev) => {
    //         return { ...prev, [key]: hsl_string };
    //     });

    //     const parsed_hsl = hslStringToNewFormat(hsl_string);
    //     if (typeof key === "string") {
    //         document.documentElement.style.setProperty(key, parsed_hsl);
    //     }
    // }

return (
    <div
        style={{ borderColor: color_string }}
        className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border-4">
        <div className="w-full px-2 text-sm">{color_key}</div>

        <ColorEditble
            color_key={color_key}
            setColors={setColors}
            value={color_string}
            bg_color={color_string}
            init_color={color_obj}
            saveColor={() => localStorage.setItem("color_variables", colorArrayToString(colors_arr))}
           
        />
    </div>
);
}
