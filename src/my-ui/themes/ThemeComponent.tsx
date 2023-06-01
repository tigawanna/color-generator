import { ColorVariableInputs } from "./ColorVariableInputs";
import { ColorsList } from "./ColorsList";

interface ThemeComponentProps {

}

export function ThemeComponent({}:ThemeComponentProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    <ColorVariableInputs/>
    <ColorsList/>
 </div>
);
}
