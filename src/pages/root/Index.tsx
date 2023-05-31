import { Slider } from "@/shadcn/ui/slider";
import { CardDemo } from "../../components/CardDemo";
import { AccordionDemo } from "@/components/AccordionDemo";
import { TableDemo } from "@/my-ui/shad_demo/TableDemo";

interface IndexProps {}

export function IndexRoute({}: IndexProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5">
      <div className="flex h-full w-[95%] flex-col items-center justify-center gap-16 p-5 md:w-[60%]">
        <CardDemo />
        <Slider defaultValue={[33]} max={100} step={1} />
        <AccordionDemo />
        <TableDemo />
      </div>
    </div>
  );
}
