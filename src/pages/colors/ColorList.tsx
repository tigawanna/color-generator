import { ColorList } from "@/my-ui/color_themes/ColorList";

interface ColorsProps {}

export function Colors({}: ColorsProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ColorList />
    </div>
  );
}
