import { useColorThemeStore } from "@/state/zustand/color_theme";
import { useColorJsonContext } from "@/state/zustand/color_context";

interface ColorVariablesProps {

}

export function ColorVariableInputs({ }: ColorVariablesProps) {
    const{color_variables,updateColorVariables,mode} =useColorThemeStore()
    const colors  = useColorJsonContext((s)=>s.color_json)
    
    // console.log("color mode in form  === ", mode)
    // console.log("color variables in form == ", color_variables)

    function handleChange(e: any) {
        updateColorVariables(e.target.value,e.target.id)
    }

   

    return (
        <div className='h-auto min-h-[500px] w-full rounded-lg  bg-secondary p-5  shadow-md '>
            <div 
            className="h-full w-full flex flex-col items-center">
                <h3 className="text-lg font-bold p-1 capitalize">{mode}</h3>
                <textarea
                id={mode}
                className="w-full h-full min-h-[70vh] p-3 rounded-md outline-none" 
                value={color_variables[mode]} 
                onChange={handleChange} />
            </div>

        </div>
    );
}
