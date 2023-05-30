import { ColorEditble } from "./ColorEdit";
import { CSSVariableList, colorArrayToString, updateLocalStorageColorVariables } from "./helpers";


interface ColorCardProps {
color_key: string;
color_string: string;
theme:"light"|"dark"
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

export function ColorCard({
    color_obj,color_string,colors_arr,color_key,setColors,group_type,color_json,theme}:ColorCardProps){
    
return (
    <div
        style={{ borderColor: color_string }}
        className="flex w-full items-center justify-between gap-2 rounded-lg">
        <div className="px-2 text-xs md:text-md">{color_key}</div>

        <ColorEditble
            color_key={color_key}
            theme={theme}
            color_json={color_json}
            setColors={setColors}
            group_type={group_type}
            value={color_string}
            bg_color={color_string}
            init_color={color_obj}
            saveColor={() =>updateLocalStorageColorVariables(colorArrayToString(colors_arr),theme)}
           
        />
    </div>
);
}
