import { Outlet } from "@tanstack/router";


interface AboutlayoutProps {

}

export function Aboutlayout({}:AboutlayoutProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
       <Outlet />
 </div>
);
}
