import { ColorVariableInputs } from "./ColorVariableInputs";
import { ColorsList } from "./ColorsList";

interface ThemeComponentProps {

}

export function ThemeComponent({}:ThemeComponentProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <ColorVariableInputs/>
    <ColorsList/>
 </div>
);
}
