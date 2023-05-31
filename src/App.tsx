import { Link, Outlet } from "@tanstack/router";
import { Notification } from "./my-ui/shared/Notification";
import { useLoadCSSvars } from "./utils/helpers/load_variables";
import { useZustandTheme } from "./utils/hooks/useZustandTheme";

function App() {
  const { ThemeIcon, mode, toggleTheme } = useZustandTheme()
  useLoadCSSvars();
  return (
    <div className="flex min-h-screen flex-col items-center gap-2">
      <div
        className="hover:undeline sticky top-0 flex h-10 w-full  gap-3 
      border-b bg-secondary p-3 hover:text-accent-foreground"
      >
        <Link to="/">Home</Link>
        <Link to="/colors">Colors</Link>
      </div>
      <div className='flex gap-2 sticky top-2'>
        <ThemeIcon onClick={() => toggleTheme()} className='' />
      </div>
      <Outlet />
      <div className="fixed bottom-3 flex w-full items-center justify-center">
        <Notification />
      </div>
    </div>
  );
}

export default App;
