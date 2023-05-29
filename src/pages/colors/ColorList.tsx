import { ColorList } from "@/my-ui/color_themes/ColorList";




interface ColorsProps {}

export function Colors({}: ColorsProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ColorList/>
    </div>
  );
}
