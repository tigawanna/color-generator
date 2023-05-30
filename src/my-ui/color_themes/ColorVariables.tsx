import { useState } from "react";
import { default_variables } from "./helpers";

interface ColorVariablesProps {

}

export function ColorVariables({}:ColorVariablesProps){
const [varaibles,setVariables]=useState(()=>{
    return localStorage.getItem("color_variables") || default_variables;
})
const [dark_varaibles,setDarkVariables]=useState(()=>{
    return localStorage.getItem("dark_color_variables") || default_variables;
})

function handleChange(e:any){
    setVariables(e.target.value)
    localStorage.setItem("color_variables",e.target.value)
}
function handleDarkChange(e:any){
    setDarkVariables(e.target.value)
    localStorage.setItem("dark_color_variables",e.target.value)
}

return (
 <div className='w-[90%] md:w-[50%] flex  items-center gap-3 p-5'>
    <div className="h-full w-full flex flex-col items-center">
            <h3 className="text-lg">light</h3>
         <textarea className="w-full h-full min-h-[80vh] p-3 rounded-md" value={varaibles} onChange={handleChange}/>
    </div>
    <div className="h-full w-full flex flex-col items-center">
        <h3 className="text-lg">dark</h3>
            <textarea className="w-full h-full min-h-[80vh] p-3 rounded-md" value={dark_varaibles} onChange={handleDarkChange}/>
    </div>

 </div>
);
}
