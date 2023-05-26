import { useState } from "react";
import { ColorResult, PhotoshopPicker } from "react-color";

interface EditColorsModalProps {
open:boolean;
setOpen: React.Dispatch<React.SetStateAction<boolean>>
updateColor(color:ColorResult['hsl']): void
color_to_edit:ColorResult['hsl']
}

export function EditColorsModal({open,setOpen,color_to_edit,updateColor}:EditColorsModalProps){

    const [color, setColor] = useState(color_to_edit);
    // console.log("color to edit==== ",color)
    function handleChange(new_color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        console.log("new color  ===== ",new_color)
        setColor(new_color.hsl);
        updateColor(new_color.hsl);
    }
    // console.log("color ==== ",color)
if(!open) return (
    // <button
    // onClick={()=>setOpen(true)}
    // className="bg-purple-600">
    //     open
    // </button>
    null
)
return (
    <div 
        onClick={(e) => {
            e.stopPropagation()
            setOpen(false)
        }}
    className='fixed h-full w-full flex z-30 items-center justify-center bg-slate-600 bg-opacity-30'>

    <div 
    onClick={(e)=>{
        e.stopPropagation()
    }}
    className="relative  flex justify-center items-center ">
        <div className='w-full h-full flex items-center justify-center'>
            <PhotoshopPicker color={color} onChange={handleChange} />
        </div>
    </div>

 </div>
);
}
