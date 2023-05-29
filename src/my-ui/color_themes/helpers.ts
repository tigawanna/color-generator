import { NotificationType } from "@/state/zustand/store";
import { hslObjectToStringtinyColor, hslStringToNewFormat, hslStringToObjectTinyColor, hslStringToValidHsl } from "./colors";

export function cssVariablesToJson(data:string){
    // Step 1: Split the data string into an array of lines using the split() method.
    const lines = data.split('\n');

    // Step 2: Filter out any empty lines using the filter() method.
    const nonEmptyLines = lines.filter(line => line.trim() !== '');

    // Step 3: Map each line to an object with the key and an array of values.
    const objects = nonEmptyLines.map(line => {
        const [key, ...values] = line.split(':');
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


export function copyToClipboard(text: string, updateNotification: (notifocation: NotificationType) => void
) {
    navigator.clipboard.writeText(text)
        .then(() => {
            // console.log('Copied to clipboard:', text)
            localStorage.setItem("color_variables", text);
            updateNotification({message: "Copied to clipboard", type: "success"});
        })
        .catch((error) => {
            updateNotification({message: "Failed to copy to clipboard :"+error, type: "error"});
            console.error('Error copying to clipboard:', error)
        });
}




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
