import { CardDemo } from "@/components/CardDemo";
import { Shaddemos } from "../shad_demo/Shaddemos";
import { ColorVariableInputs } from "./ColorVariableInputs";
import { ColorsList } from "./ColorsList";

interface ThemeComponentProps {

}

export function ThemeComponent({}:ThemeComponentProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-3 p-5'>
    <ColorVariableInputs/>
    <div className=" flex flex-wrap p-5 justify-center w-full gap-10">
         <ColorsList />
        <CardDemo className="md:w-[40%]"/>
    </div>
      <Shaddemos />

 </div>
);
}
