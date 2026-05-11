import { useAuth } from '../../store/authStore'
import { User, Mail, Shield, Edit2 } from 'lucide-react'
import {
  cardClass,
  headingClass,
  bodyText,
  mutedText,
  avatar,
  primaryBtn,
  divider,
} from '../styles/common'

function Profile() {
  const currentUser = useAuth((state) => state.currentUser)

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className={mutedText}>Loading profile…</p>
      </div>
    )
  }

  const initials =
    `${currentUser.firstName?.[0] ?? ''}${currentUser.lastName?.[0] ?? ''}`.toUpperCase() || '?'

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-52px)] p-6 md:p-10 bg-[#f8f9fa]">
      <div className={`${cardClass} w-full max-w-sm text-center`}>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {currentUser.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#dadce0]"
            />
          ) : (
            <div className={`${avatar} w-20 h-20 text-2xl`}>
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className={`${headingClass} mb-1`}>
          {currentUser.firstName} {currentUser.lastName}
        </h1>

        {/* Role */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Shield className="w-3.5 h-3.5 text-[#80868b]" />
          <span className={mutedText}>{currentUser.role || 'Member'}</span>
        </div>

        {/* Email */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <Mail className="w-3.5 h-3.5 text-[#80868b]" />
          <span className={bodyText}>{currentUser.email || 'No email'}</span>
        </div>

        <div className={divider.replace('my-10', 'my-4')} />

        {/* Edit button */}
        <button className={`${primaryBtn} flex items-center gap-2 mx-auto`}>
          <Edit2 className="w-3.5 h-3.5" />
          Edit Profile
        </button>

      </div>
    </div>
  )
}

export default Profile