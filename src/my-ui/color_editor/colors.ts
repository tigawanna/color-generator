import { HSLColor } from "react-color";
import tinycolor from "tinycolor2";

export function hslStringToValidHsl(hsl:string){
    return tinycolor(hsl).toHslString();
}

export function hslStringToObjectTinyColor(hsl:string){
    return tinycolor(hsl).toHsl()
}

export function hslObjectToStringtinyColor(hsl:HSLColor){
 return tinycolor(hsl).toHslString();
}


export function hslStringToNewFormat(hslString: string) {
    const color = tinycolor(hslString);
    const hsl = color.toHsl();
    return `${Math.round(hsl.h)} ${Math.round(hsl.s * 100)}% ${Math.round(hsl.l * 1000) / 10}%`;
}




// export function hslObjectToString(hsl_obj: { h: number, s: number, l: number, a?: number }, prefix = false) {
//     if (prefix) {
//         return `hsl(${Math.round(hsl_obj.h)}, ${Math.round(hsl_obj.s * 100)}%, ${Math.round(hsl_obj.l * 100)}%)`
//     }
//     return `${Math.round(hsl_obj.h)} ${Math.round(hsl_obj.s * 100)}%  ${Math.round(hsl_obj.l * 100)}%`
// }
