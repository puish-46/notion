import { useState, useEffect } from 'react'
import { useAuth } from '../../store/authStore'
import { useNavigate } from 'react-router'
import { User, Mail, Shield, Lock, Edit2, Loader2, Trash2 } from 'lucide-react'
import {
  cardClass,
  headingClass,
  bodyText,
  mutedText,
  primaryBtn,
  divider,
  secondaryBtn,
  inputClass,
  labelClass,
  formGroup,
} from '../styles/common'

function Profile() {
  const currentUser = useAuth((state) => state.currentUser)
  const updateProfile = useAuth((state) => state.updateProfile)
  const deleteAccount = useAuth((state) => state.deleteAccount)
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    avatarUrl: '',
  })

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        avatarUrl: currentUser.avatarUrl || '',
      })
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className={mutedText}>Loading profile…</p>
      </div>
    )
  }

  const initials =
    `${currentUser.firstName?.[0] ?? ''}${currentUser.lastName?.[0] ?? ''}`.toUpperCase() || '?'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await updateProfile(formData)
      setSuccess('Profile updated successfully.')
      setIsEditing(false)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
    if (!confirmDelete) return
    setLoading(true)
    setError('')
    try {
      await deleteAccount()
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete account.')
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-52px)] p-6 md:p-10 bg-[#f8f9fa]">
      <div className={`${cardClass} w-full max-w-sm py-10`}>
        {error && <div className="mb-4 text-xs text-[#cc2f26] bg-[#ff3b30]/10 p-3 rounded-lg text-center">{error}</div>}
        {success && <div className="mb-4 text-xs text-[#137333] bg-[#34a853]/10 p-3 rounded-lg text-center">{success}</div>}

        {!isEditing ? (
          <div className="text-center">
            {/* Avatar */}
            <div className="flex justify-center mb-5 mt-2">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-[#dadce0]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center text-3xl font-medium">
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

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className={`${secondaryBtn} flex items-center justify-center gap-2`}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={() => navigate('/dashboard/change-password')}
                className={`${primaryBtn} flex items-center justify-center gap-2`}
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="mt-2 text-[#cc2f26] text-sm font-medium hover:underline flex justify-center items-center gap-1"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="text-left">
            <h2 className="text-xl font-medium text-center mb-6 text-[#202124]">Edit Profile</h2>
            <div className={formGroup}>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div className={formGroup}>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className={formGroup}>
              <label className={labelClass}>Avatar URL</label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <button type="submit" disabled={loading} className={`${primaryBtn} flex justify-center`}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className={secondaryBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile