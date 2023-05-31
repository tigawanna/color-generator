import { NotificationType } from "@/state/zustand/store";
import { hslObjectToStringtinyColor, hslStringToNewFormat, hslStringToObjectTinyColor, hslStringToValidHsl } from "./colors";
import { HSLColor } from "react-color";
import tinycolor from "tinycolor2";



export const default_variables =`
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 215 20.2% 65.1%;`

export function cssVariablesToJson(data:string){
    // Step 1: Split the data string into an array of lines using the split() method.
    const lines = data?.split('\n');

    // Step 2: Filter out any empty lines using the filter() method.
    const nonEmptyLines = lines.filter(line => line.trim() !== '');

    // Step 3: Map each line to an object with the key and an array of values.
    const objects = nonEmptyLines.map(line => {
        const [key, ...values] = line?.split(':');
        return { [key?.trim()]: values[0]?.trim() };
    });

    // Step 4: Convert the first value in each array to an array of numbers.
    objects.forEach(obj => {
        const [key, value] = Object.entries(obj)[0];
        //@ts-expect-error
        obj[key] = value?.split(' ').map(parseFloat);
    });

    // Step 5: Combine all the objects into a single JSON object using reduce() and Object.assign().
    const json = objects?.reduce((result, current) => Object?.assign(result, current), {});
    // //no,log(json);
    return json

}

export type CSSVariableList = [string, number[]][]
export type CSSVariable = [string, number[]];

export type CSSVariableGroup = {
    [key: string]: CSSVariable[];
};


export function colorArrayToString(css_var_arr:CSSVariableList) {
    const cssString = css_var_arr
        .map(([key, value]) => {
        if (typeof value === 'string') {
                const parsed_value = hslStringToNewFormat(value);
                return `${key}: ${parsed_value};`;
            }

            if (Array.isArray(value)) {
                const valueString = value.map((v, idx) => {
                return (idx !== 0 ? `${v}%` : `${v}`)
                }).join(' ');
                return `${key}: ${valueString};`;
            } 
        })
        .join('\n');

    return cssString;
}

export function copyToClipboard(text: string,theme:"dark"|"light") {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (err) {
        console.error('Error copying to clipboard:', err);
    } finally {
        document.body.removeChild(el);
    }

    if (success) {
        // localStorage.setItem('color_variables', text);
        updateLocalStorageColorVariables(text,theme);
        // updateNotification({ message: 'Copied to clipboard', type: 'success' });
    } else {
        // updateNotification({ message: 'Failed to copy to clipboard', type: 'error' });
    }
}


// export function copyToClipboard(text: string, updateNotification: (notifocation: NotificationType) => void
// ) {
//     navigator.clipboard.writeText(text)
//         .then(() => {
//             // console.log('Copied to clipboard:', text)
//             localStorage.setItem("color_variables", text);
//             updateNotification({message: "Copied to clipboard", type: "success"});
//         })
//         .catch((error) => {
//             updateNotification({message: "Failed to copy to clipboard :"+error, type: "error"});
//             console.error('Error copying to clipboard:', error)
//         });
// }




export function getcolorObjANdColorString(val: string | number[]) {
    if (typeof val === "string") {
        const color_obj = hslStringToObjectTinyColor(val);
        const color_string = hslStringToValidHsl(val);
        return {
            color_obj, color_string
        }
    }
    if (Array.isArray(val)) {
        const color_obj = {
            h:val[0],
            s: val[1],
            l: val[2]
        }
        const color_string = hslObjectToStringtinyColor(color_obj);
        return {
            color_obj, color_string
        }
    }
    return {
        color_obj: { h: 0, s: 0, l: 0 },
        color_string: ""
    }

}


export function getReadableColor(background: HSLColor): HSLColor {
    const color = tinycolor(background);
   if(color.isLight()){
       color.darken(50);
       return color.toHsl();
   }
    color.lighten(50);
    return color.toHsl();
    


}


export function updateDocumentColorVariables(key: string,theme:"light"|"dark", value: string) {
    console.log(theme,value);
    document.documentElement.style.setProperty(key, value);
}


export function updateLocalStorageColorVariables(value: string,theme:"dark"|"light") {
    if(theme == "dark"){
        localStorage.setItem("dark_color_variables", value);
    }
    localStorage.setItem("color_variables", value);
}
// export function updateDocumentColorVariables(key: string, theme: 'light' | 'dark', value: string) {
//     if (theme === 'dark') {
//         document.documentElement.style.setProperty(`--${key}-dark`, value);
//     }
//     document.documentElement.style.setProperty(`--${key}-${theme}`, value);
// }
