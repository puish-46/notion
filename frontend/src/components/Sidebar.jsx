import { NavLink, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  User,
  Search,
  FileText,
  CheckSquare,
  BookOpen,
  LogOut,
  Feather,
  Loader2,
} from 'lucide-react'
import { useAuth } from '../../store/authStore'

const links = [
  { to: '/dashboard/dashboardhome', label: 'Home', icon: LayoutDashboard },
  { to: '/dashboard/profile',       label: 'Profile',  icon: User },
  { to: '/dashboard/search',        label: 'Search',   icon: Search },
  { to: '/dashboard/page',          label: 'Pages',    icon: FileText },
  { to: '/dashboard/task',          label: 'Tasks',    icon: CheckSquare },
  { to: '/dashboard/journal',       label: 'Journal',  icon: BookOpen },
]

function Sidebar() {
  const navigate = useNavigate()
  const logout = useAuth((state) => state.logout)
  const loading = useAuth((state) => state.loading)
  const currentUser = useAuth((state) => state.currentUser)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 ${
      isActive
        ? 'bg-[#0066cc]/10 text-[#0066cc] font-semibold'
        : 'text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] font-normal'
    }`

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 border-r border-[#e8e8ed] bg-white flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 h-[52px] border-b border-[#e8e8ed]">
        <Feather className="w-4 h-4 text-[#0066cc]" strokeWidth={2.5} />
        <span className="text-sm font-semibold text-[#1d1d1f] tracking-tight">Taskify</span>
      </div>

      {/* User pill */}
      {currentUser && (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#e8e8ed]">
          <div className="w-8 h-8 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-xs font-bold shrink-0">
            {currentUser.firstName?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#1d1d1f] truncate">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-[0.65rem] text-[#a1a1a6] truncate">{currentUser.email}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navCls}>
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[#e8e8ed]">
        <button
          id="sidebar-logout-btn"
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#ff3b30] hover:bg-[#ff3b30]/5 transition-colors duration-150 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4 shrink-0" />
          )}
          {loading ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar