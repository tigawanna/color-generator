import { useState } from 'react';
import shad_vars from './variables.json'
import { EditColorsModal } from './EditColorsModal';
import { ColorResult } from 'react-color';
import { hslObjectToString } from '@/utils/helpers/hsl';



interface ColorsEditorsProps {

}


export function ColorsEditors({}:ColorsEditorsProps){
    const [open,setOpen]=useState(false)
    const [colors, setColors] = useState(shad_vars);
    interface EditingColor {
        init_color: ColorResult['hsl'],
        key: keyof typeof colors

    }
    const [editing_color,setEditingColor]=useState<EditingColor>({ 
        init_color:{h:0,s:0,l:0},key:'primary'
    })

    const color_vars = Object.entries(colors) as [keyof typeof colors,string][]
    
    function updateColor(color:ColorResult['hsl'],key:keyof typeof colors){
        const hsl_string = hslObjectToString(color)
        // console.log("key update  ===== ",hsl_string)
        setColors({...colors, [key]:hsl_string})
    }




return (
 <div className='w-full h-full flex flex-col items-center justify-center'>

<EditColorsModal
open={open} 
setOpen={setOpen}
color_to_edit={editing_color.init_color} 
updateColor={(color)=>updateColor(color, editing_color.key)}/>


<div className='w-full h-full flex flex-wrap gap-2 items-center justify-center'>
{color_vars.map(([key,value])=>{
    const hsl_values  = value.split(',')
    const hsl_string = `hsl(${value})`

// console.log("hsl string === ",hsl_values[0])
    return (
    <div key={key}
        onClick={()=>{
            setEditingColor({init_color:editing_color.init_color,key})
            setOpen(true)
        }}
        className='w-[90%] sm:w-[40%] md:w-[30%]  
        h-full flex flex-col items-center justify-center border rounded-lg
        shadow hover:shadow-lg hover:brightness-110 
        '>
    <div className='w-full px-2 '>
        {key}
    </div>
    <div 
    style={{ backgroundColor: hsl_string }} 
    className='w-full h-full p-5'>
        {value}
    </div>
    </div>
    )
})}
    </div>
    </div>
);

}
