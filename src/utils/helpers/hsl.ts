// @ts-expect-error
import ContrastColor from 'contrast-color'

export function hslStringToObject(hsl_str: string) {
    //  check if string has hsl in it
    if (hsl_str.includes('hsl')) {
        const hsl_values = hsl_str.split('(')[1].replace(')', '').split(',')
       return{
            h:parseInt(hsl_values[0]),
            s:parseInt(hsl_values[1]),
            l:parseInt(hsl_values[2])
        }
    }
    const hsl_values = hsl_str.split('(')
    return {
        h: parseInt(hsl_values[0]),
        s: parseInt(hsl_values[1]),
        l: parseInt(hsl_values[2])
    }
}


export function hslObjectToString(hsl_obj: { h: number, s: number, l: number , a?: number},prefix = false) {
    if(prefix){
        return `hsl(${Math.round(hsl_obj.h)}, ${Math.round(hsl_obj.s * 100)}%, ${Math.round(hsl_obj.l*100)}%)`
    }
    return `${Math.round(hsl_obj.h)}, ${Math.round(hsl_obj.s * 100)}%, ${Math.round(hsl_obj.l*100)}%`
}



export function hslColorContrastGenerator(bg_color:string,threshold:number){
    if(!bg_color){
        return bg_color
    }
    const cc = new ContrastColor({
        bgColor: "navy",
        fgDarkColor: "navy",
        fgLightColor: "water",
        customNamedColors: {
            water: "#00D0FF",
        },
    });

  const contrast_color = cc.contrastColor();
  console.log(contrast_color)
  return contrast_color
}
