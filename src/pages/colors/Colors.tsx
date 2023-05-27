import { ColorsList } from "@/my-ui/color_editor/ColorsList";
import { ColorsEditors } from "@/my-ui/colors/ColorsEditors";

interface ColorsProps {}

export function Colors({}: ColorsProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
       {/* <ColorsEditors/> */}
       <ColorsList/>
    </div>
  );
}
