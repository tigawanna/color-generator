import { AccordionDemo } from "@/components/AccordionDemo";
import { CardDemo } from "@/components/CardDemo";
import { Slider } from "@radix-ui/react-slider";
import { TableDemo } from "./TableDemo";

interface SaddemosProps {}

export function Shaddemos({}: SaddemosProps) {
  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-center gap-16 p-5 md:w-[60%]">
      <CardDemo />
      <Slider defaultValue={[33]} max={100} step={1} />
      <AccordionDemo />
      <TableDemo />
    </div>
  );
}
