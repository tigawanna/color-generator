import { useState } from "react";
import { ColorResult, PhotoshopPicker } from "react-color";

interface PhotoshopColorPickerProps {

}

export function PhotoshopColorPicker({}:PhotoshopColorPickerProps){
    const initialColor = {
        h: 0,
        s: 0,
        l: 0
    };
    const [color, setColor] = useState(initialColor);
    function handleChange(new_color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        setColor(new_color.hsl);
    }
    console.log("color === ",color)
return (
 <div className='w-full h-full flex items-center justify-center'>
        <PhotoshopPicker color={color} onChange={handleChange}/>
 </div>
);
}
