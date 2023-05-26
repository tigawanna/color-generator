import { useState } from 'react'
import { Link, Outlet } from '@tanstack/router'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center">
      <div className='w-full flex gap-3 sticky top-0 h-10 text-xl hover:undeline border-b p-2'>
        <Link to="/">Home</Link> 
        <Link to="/Colors">Colors</Link>

      </div >
        <Outlet/>
    </div>
  )
}

export default App
