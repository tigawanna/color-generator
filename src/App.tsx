
import { Link, Outlet } from '@tanstack/router'
import { Notification } from './my-ui/shared/Notification'
import { useLoadCSSvars } from './utils/helpers/load_variables'




function App() {
  useLoadCSSvars()
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center">
      <div className='w-full flex gap-3 sticky top-0 h-10  hover:undeline border-b p-2 bg-secondary hover:text-accent-foreground'>
        <Link to="/">Home</Link> 
        <Link to="/Colors">Colors</Link>

      </div >
        <Outlet/>
      <div className="w-full fixed bottom-3 flex items-center justify-center">
        <Notification />
      </div>
    </div>
  )
}

export default App
