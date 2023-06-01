import { Slider } from "@/shadcn/ui/slider";
import { CardDemo } from "../../components/CardDemo";
import { AccordionDemo } from "@/components/AccordionDemo";
import { TableDemo } from "@/my-ui/shad_demo/TableDemo";
import { Shaddemos } from "@/my-ui/shad_demo/Shaddemos";
import { ThemeComponent } from "@/my-ui/themes/ThemeComponent";

interface IndexProps {}

export function IndexRoute({}: IndexProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5">
      <ThemeComponent />
    </div>
  );
}
