import { useContext } from "react";
import { useStore } from "zustand";
import { BearContext } from "./about_context";

interface aboutColorProps {

}

export function AboutColor({}:aboutColorProps){
    const store = useContext(BearContext)
    if (!store) throw new Error('Missing BearContext.Provider in the tree')
    const bears = useStore(store, (s) => s.bears)
    const addBear = useStore(store, (s) => s.addBear)
return (
 <div className='w-full h-full flex items-center justify-center'>
        <div>{bears} Bears.</div>
        <button onClick={addBear}>Add bear</button>
 </div>
);
}
