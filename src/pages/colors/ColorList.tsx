import { ThemeComponent } from "@/my-ui/themes/ThemeComponent";

interface ColorsProps {}

export function Colors({}: ColorsProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ThemeComponent />
    </div>
  );
}
