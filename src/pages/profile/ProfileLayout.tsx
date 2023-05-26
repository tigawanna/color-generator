import { Outlet } from "@tanstack/router";

interface ProfileLayoutProps {

}

export function ProfileLayout({}:ProfileLayoutProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
