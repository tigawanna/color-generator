import { AccordionDemo } from "@/components/AccordionDemo";

interface AboutIndexProps {}

export function About({}: AboutIndexProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[30%]">
        <AccordionDemo />
      </div>
    </div>
  );
}
