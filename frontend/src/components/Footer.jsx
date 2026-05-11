import { Feather } from 'lucide-react'
import { NavLink } from 'react-router'
import { navLinkClass } from '../styles/common'

function Footer() {
  return (
    <footer className="border-t border-[#e8e8ed] bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-1.5">
          <Feather className="w-4 h-4 text-[#0066cc]" strokeWidth={2.5} />
          <span className="text-sm font-semibold text-[#1d1d1f] tracking-tight">Taskify</span>
        </div>

    

        {/* Copyright */}
        <p className="text-xs text-[#a1a1a6]">
          © {new Date().getFullYear()} Taskify. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer