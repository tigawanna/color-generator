import { useColorThemeStore } from "@/state/zustand/color_theme";
import { DialogWrapper } from "@/shadcn/DialogWrapper";
import { Edit2 } from "lucide-react";

interface ColorVariablesProps {}

export function ColorVariableInputs({}: ColorVariablesProps) {
  const { color_variables_obj, updateColorVariables, mode } = useColorThemeStore();


  // console.log("color mode in form  === ", mode)
  // console.log("color variables in form == ", color_variables)

  function handleChange(e: any) {
    updateColorVariables(e.target.value, e.target.id);
  }

  return (
    <div className="h-fit">
      <DialogWrapper
        trigger={
          <button className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:bg-accent hover:brightness-150">
            <Edit2/>
          </button>
        }>
        <div className="flex h-full w-full flex-col items-center">
          <h3 className="p-1 text-lg font-bold capitalize">{mode}</h3>
          <textarea
            id={mode}
            className="h-full min-h-[70vh] w-full rounded-md p-5 outline-none "
            value={color_variables_obj[mode]}
            onChange={handleChange}
          />
        </div>
      </DialogWrapper>
    </div>
  );
}
