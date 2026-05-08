import { NavLink,useNavigate } from "react-router"

function Sidebar() {

  const navigate=useNavigate();

  const onLogout=()=>{
    navigate("/")
  }
  return (
    <ul>
    <aside className="sidebar p-10">

      <nav className="nav-links">

        <li className="pb-5">
            <NavLink
            to="/dashboard/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
            >
            Profile
            </NavLink>
        </li>

        <li className="pb-5">
            <NavLink
            to="/dashboard/dashboardhome"
            className={({ isActive }) => (isActive ? "active" : "")}
            >
            Home
            </NavLink>
        </li>

        <li className="pb-5">
            <NavLink
            to="/dashboard/search"
            className={({ isActive }) => (isActive ? "active" : "")}
            >
            Search
            </NavLink>
        </li>

        <li className="pb-5">
            <NavLink
            to="/dashboard/page"
            className={({ isActive }) => (isActive ? "active" : "")}
            >
            Page
            </NavLink>
        </li>

        <li className="pb-5">
            <NavLink
            to="/dashboard/task"
            className={({ isActive }) => (isActive ? "active" : "")}
            >
            Task
            </NavLink>
        </li>

        <li className="pb-5">
            <NavLink
            to="/dashboard/journal"
            className={({ isActive }) => (isActive ? "active" : "")}
            >
            Journal
            </NavLink>
        </li>

        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      </nav>
    </aside>
    </ul>
  )
}

export default Sidebar