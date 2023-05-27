import { ColorsList } from "@/my-ui/color_editor/ColorsList";


interface ColorsProps {}

export function Colors({}: ColorsProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ColorsList/>
    </div>
  );
}
