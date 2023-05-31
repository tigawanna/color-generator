import { DialogWrapper } from "@/shadcn/DialogWrapper";
import { useEffect, useState } from "react";
import { ColorCard } from "./ColorCard";

import {
  cssVariablesToJson,
  CSSVariableList,
  CSSVariableGroup,
  CSSVariable,
  copyToClipboard,
  colorArrayToString,
  getcolorObjANdColorString,
  default_variables,
  updateLocalStorageColorVariables,
} from "./helpers";
import { useDarkTheme } from "@/utils/hooks/useDarkTheme";
import { ColorVariables } from "./ColorVariables";
import { useColorJson } from "@/state/utils/UseColorVariables";

interface ColorsListProps {}

export function ColorList({}: ColorsListProps) {

  const [color_variables, setColovariables] = useState(() => {
    return localStorage.getItem("color_variables") || default_variables;
  });
  const [bg_class, setBgClass] = useState({ k: "--background", v:'354, 100%, 90%'});
  // const [color_json, setColors] = useState(cssVariablesToJson(color_variables));
  const {color_json,setColors}=useColorJson(color_variables);
  const [copy, setCopied] = useState(false);
  const{theme}=useDarkTheme()

  useEffect(() => {
    setColors(cssVariablesToJson(color_variables));
    if (color_variables && color_variables !== "") {
      // localStorage.setItem("color_variables", color_variables);
      updateLocalStorageColorVariables(color_variables, theme);
    }
  }, [color_variables]);

  useEffect(() => {
    const timeout_id = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timeout_id);
  }, [copy]);

  // useEffect(() => {
 
  //   Object.entries(color_json).forEach(([key, value]) => {
  //     const { color_string } = getcolorObjANdColorString(value);
  //     const output = color_string
  //       .replace(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/, "$1,$2% $3%")
  //       .replace(/,/g, " ");

  //     console.log("color_string", output);
  //     document.documentElement.style.setProperty(key, output);
  //   })
  // },[color_json])

  function groupByVariableName(variables: CSSVariableList): CSSVariableGroup {
    return variables.reduce((groups: CSSVariableGroup, [name, value]: CSSVariable) => {
      const group_by = name?.split("--")[1]?.split("-");
      const groupName = group_by && group_by.length > 0 ? group_by[0] : "";
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push([name, value]);
      return groups;
    }, {});
  }

  const colors_arr = Object.entries(color_json) as unknown as CSSVariableList;
  const grouped_variables = Object.entries(groupByVariableName(colors_arr));
function updateBgClass(){
  setBgClass(prev=>{
    if (prev.v === '154, 50%, 60%'){
      return { k: prev.k, v:'354, 100%, 90%' }
    }
    return { k: prev.k, v: '154, 50%, 60%' }
  })
  document.documentElement.style.setProperty(bg_class.k,bg_class.v);
}

function updateClass(k:string,v:string){
  document.documentElement.style.setProperty(k,v);
}

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-5 p-5">
      <div className="flex gap-3 items-center justify-center">
       
        {/* <DialogWrapper
          trigger={
            <button className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:bg-accent hover:brightness-125">
              enter variables
            </button>
          }>
          <textarea
            className="h-auto min-h-[500px] w-full rounded-lg  bg-secondary p-5  shadow-md outline-none"
            value={color_variables}
            onChange={(e) => setColovariables(e.target.value)}
          />
        </DialogWrapper> */}

        <button
          onClick={() => {
            copyToClipboard(colorArrayToString(colors_arr),theme);
            setCopied(true);
          }}
          className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:brightness-125">
          {copy ? <div className="">copied</div> : <div className="">copy</div>}
        </button>
      <button
      onClick={updateBgClass} 
      className="p-3 bg-slate-600 ">background</button>
      </div>
      
      
      
      <div className="flex h-full md:flex-row flex-col-reverse  w-full items-start justify-evenly">
      <ColorVariables/>

      <div className="flex w-[95%] max-h-[500px] md:w-[40%] flex-wrap items-center justify-center gap-1 p-2 md:gap-5 md:p-1 overflow-y-scroll">
        {grouped_variables.map(([key, value]) => {
          const is_pair = value.length === 2;
          return (
            <div
              key={key}
              className="flex w-full flex-col rounded-lg p-2 shadow-md shadow-accent-foreground">
              <div className="text-lg font-bold">{key}</div>
              <div className="flex w-full flex-col gap-1 rounded-xl border">
                {value.map(([key, value]) => {
                  
                  function variableprimaryorForeground(group_key: string) {
                    const is_fore = group_key?.split("--")[1]?.split("-");
                    if (is_pair && is_fore.length === 1) {
                      return "primary";
                    }
                    if (is_pair && is_fore.length === 2) {
                      return "foreground";
                    }
                    return "solo";
                  }

                  const { color_obj, color_string } = getcolorObjANdColorString(value);
                  return (
                    <ColorCard
                      group_type={variableprimaryorForeground(key)}
                      color_obj={color_obj}
                      color_string={color_string}
                      color_key={key}
                      color_json={color_json}
                      key={key}
                      colors_arr={colors_arr}
                      setColors={setColors}
                      updateClass={updateClass}
                      theme={theme}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
