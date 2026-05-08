import { Outlet } from "react-router";
import Sidebar from './Sidebar'

function DashBoard() {
  return (
    <div className="flex min-h-screen bg-[#f7f8fa]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default DashBoard