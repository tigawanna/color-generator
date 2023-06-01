import { ColorList } from "@/my-ui/color_themes/ColorList";
import { cssVariablesToJson, default_variables } from "@/my-ui/color_themes/helpers";
import { ThemeComponent } from "@/my-ui/themes/ThemeComponent";
import { ColorJsonContext, colorJsonStore } from "@/state/zustand/color_context";
import { useColorThemeStore } from "@/state/zustand/color_theme";
import { useRef } from "react";

interface ColorsProps { }

export function Colors({ }: ColorsProps) {
  const { color_variables_obj, mode } = useColorThemeStore()
  const color_vars = color_variables_obj[mode]
  const store = useRef(colorJsonStore({color_json:getColorJson(color_vars)})).current
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ColorJsonContext.Provider value={store}>
        <ThemeComponent />
      </ColorJsonContext.Provider>
   </div>
  );
}

export function getColorJson(cvr: string) {
  const color_json = cssVariablesToJson(cvr??default_variables)
  return color_json
}
