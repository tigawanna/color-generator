import { useState } from "react";
import { default_variables } from "./helpers";
import { useColorThemeStore } from "@/state/zustand/color_theme";

interface ColorVariablesProps {

}

export function ColorVariableInputs({ }: ColorVariablesProps) {
    const{color_variables,updateColorVariables,mode,color_json} =useColorThemeStore()

    function handleChange(e: any) {
        updateColorVariables(e.target.value,e.target.id)
    }
     console.log(color_json)
    return (
        <div className='w-full h-fit flex  items-center gap-3 p-5'>
            <div className="h-full w-full flex flex-col items-center">
                <h3 className="text-lg font-bold p-1">light</h3>
                <textarea 
                style={{ border: mode === "light" ? "2px solid green" : "" }}
                id="light"
                className="w-full h-full min-h-[70vh] p-3 rounded-md" 
                value={color_variables['light']} 
                onChange={handleChange} />
            </div>
            <div 
            className="h-full w-full flex flex-col items-center">
                <h3 className="text-lg font-bold p-1">dark</h3>
                <textarea
                style={{ border: mode === "dark" ? "2px solid green" : "" }} 
                id="dark"
                className="w-full h-full min-h-[70vh] p-3 rounded-md" 
                value={color_variables['dark']} 
                onChange={handleChange} />
            </div>

        </div>
    );
}
