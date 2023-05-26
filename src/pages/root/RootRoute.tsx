import { Link, Outlet } from "@tanstack/router";

interface RootRouteProps {

}

export function RootLayout({}:RootRouteProps){
return (
 <div className='w-full h-full flex flex-col items-center'>
        {/* <div className="fixed top-0 w-full h-10 flex bg-secondary">
            <Link to="/">Home</Link> 
            <Link to="/Colors">Colors</Link>
        </div> */}
    
        <Outlet />
 </div>
);
}
