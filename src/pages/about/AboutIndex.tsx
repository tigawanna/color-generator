import { AccordionDemo } from "@/components/AccordionDemo";
import { AboutColor } from "@/my-ui/about/aboutColor";
import { BearContext, createBearStore } from "@/my-ui/about/about_context";
import { useRef } from "react";

interface AboutIndexProps {}

export function About({}: AboutIndexProps) {
  const store = useRef(createBearStore({bears:200})).current
  return (
    <div className="flex h-full w-full items-center justify-center">
      <BearContext.Provider value={store}>
       <AboutColor/>
      </BearContext.Provider>
    </div>
  );
}
