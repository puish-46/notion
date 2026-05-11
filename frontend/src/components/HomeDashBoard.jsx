import React, { useEffect } from 'react'
import { useWorkspace } from '../../store/workspaceStore'
import { useAuth } from '../../store/authStore'
import { useNavigate } from 'react-router'
import { Briefcase, Plus, ChevronRight } from 'lucide-react'
import { cardClass, headingClass, mutedText, pageTitleClass, primaryBtn, pageWrapper } from '../styles/common'

function HomeDashBoard() {
  const workspaces = useWorkspace((state) => state.workspaces)
  const fetchWorkspaces = useWorkspace((state) => state.fetchWorkspaces)
  const currentUser = useAuth((state) => state.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    fetchWorkspaces()
  }, [fetchWorkspaces])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className={`${pageWrapper} w-full max-w-5xl mx-auto`}>
      <h1 className={`${pageTitleClass} mb-8`}>
        {getGreeting()}, {currentUser?.firstName || 'there'}!
      </h1>

      <div className="flex items-center justify-between mb-6">
        <h2 className={headingClass}>Your Workspaces</h2>
      </div>

      {workspaces.length === 0 ? (
        <div className="bg-white rounded-[20px] p-10 text-center border border-dashed border-[#dadce0]">
          <Briefcase className="w-12 h-12 text-[#dadce0] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#202124] mb-2">No workspaces yet</h3>
          <p className={`${mutedText} mb-6`}>Create a workspace to start organizing your projects, tasks, and pages.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaces.map((ws) => (
            <div 
              key={ws._id} 
              className={`${cardClass} flex flex-col group`}
              onClick={() => navigate(`/dashboard/workspace/${ws._id}`)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center text-lg shrink-0">
                  {ws.icon || '📁'}
                </div>
                <h3 className="font-semibold text-[#202124] text-lg truncate">{ws.name}</h3>
              </div>
              <p className={`${mutedText} line-clamp-2 mb-4 flex-1`}>
                {ws.description || 'No description provided.'}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f1f3f4]">
                <span className="text-xs font-medium text-[#80868b]">
                  {ws.members?.length || 1} member{ws.members?.length !== 1 ? 's' : ''}
                </span>
                <ChevronRight className="w-4 h-4 text-[#dadce0] group-hover:text-[#1a73e8] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeDashBoard