import { Slider } from "@/shadcn/ui/slider";
import { CardDemo } from "../../components/CardDemo";
import { AccordionDemo } from "@/components/AccordionDemo";
import {TableDemo} from "@/my-ui/shad_demo/TableDemo";

interface IndexProps {

}

export function IndexRoute({}:IndexProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-2 p-5'>

<div className='w-[95%] md:w-[60%] p-5 h-full flex flex-col items-center justify-center gap-16'>


      <CardDemo />
      <Slider defaultValue={[33]} max={100} step={1} />
      <AccordionDemo/>
      <TableDemo/>
      </div>
 </div>
);
}
