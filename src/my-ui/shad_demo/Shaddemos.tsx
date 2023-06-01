import { AccordionDemo } from "@/components/AccordionDemo";
import { Slider } from "@radix-ui/react-slider";
import { TableDemo } from "./TableDemo";

interface SaddemosProps {}

export function Shaddemos({}: SaddemosProps) {
  return (
    <div className="flex h-full flex-wrap  items-center justify-center gap-16 p-5">
      {/* <CardDemo className="w-[90%] md:w-[40%]"/> */}
      <Slider defaultValue={[33]} max={100} step={1} />
      <AccordionDemo />
      <TableDemo />
    </div>
  );
}
