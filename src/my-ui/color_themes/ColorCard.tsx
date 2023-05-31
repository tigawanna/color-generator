import { ColorEditble } from "./ColorEdit";
import { CSSVariableList, colorArrayToString } from "./helpers";


interface ColorCardProps {
color_key: string;
color_string: string;
group_type: "foreground" | "primary" | "solo";
    color_json: {
        [x: string]: string;
    }
color_obj: {
        h: number;
        s: number;
        l: number;
    }
colors_arr: CSSVariableList;
setColors: React.Dispatch<React.SetStateAction<{[x: string]: string;}>>
}

export function ColorCard({color_obj,color_string,colors_arr,color_key,setColors,group_type,color_json}:ColorCardProps){
    
return (
    <div
        style={{ borderColor: color_string }}
        className="flex  items-center justify-center gap-2 rounded-lg">
        <div className="w-full px-2 text-sm">{color_key}</div>

        <ColorEditble
            color_key={color_key}
            color_json={color_json}
            setColors={setColors}
            group_type={group_type}
            value={color_string}
            bg_color={color_string}
            init_color={color_obj}
            saveColor={() => localStorage.setItem("color_variables", colorArrayToString(colors_arr))}
           
        />
    </div>
);
}
