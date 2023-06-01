import { ColorList } from "@/my-ui/color_themes/ColorList";
import { cssVariablesToJson, default_variables } from "@/my-ui/color_themes/helpers";
import { ColorJsonContext, colorJsonStore } from "@/state/zustand/color_context";
import { useColorThemeStore } from "@/state/zustand/color_theme";
import { useRef } from "react";

interface ColorsProps { }

export function Colors({ }: ColorsProps) {
  const { color_variables, mode } = useColorThemeStore()
  const color_vars = color_variables[mode]
  const store = useRef(colorJsonStore({color_json:getColorJson(color_vars)})).current
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ColorJsonContext.Provider value={store}>
        <ColorList />
      </ColorJsonContext.Provider>

    </div>
  );
}

function getColorJson(cvr: string) {
  const color_json = cssVariablesToJson(cvr??default_variables)
  // console.log("get color varaible == ", color_json)
  return color_json
}
