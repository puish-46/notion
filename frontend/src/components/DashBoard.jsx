import { Outlet } from "react-router";
import Sidebar from './Sidebar'

function DashBoard() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto bg-white flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default DashBoard