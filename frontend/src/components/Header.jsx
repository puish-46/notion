import { NavLink } from "react-router"


function Header() {
  return (
    <nav className="max-w-full">
        <div className=" flex justify-between p-5"> 
            <h2 className="logo text-4xl ">Taskify</h2>
            <ul className=" flex gap-x-20 items-center">
                <li>
                    <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    Register
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    login
                    </NavLink>
                </li>
            </ul>       
        </div>
    </nav>
  )
}

export default Header