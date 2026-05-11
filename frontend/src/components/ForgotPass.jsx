import { useState } from 'react'
import { NavLink } from 'react-router'
import { useForm } from 'react-hook-form'
import { Feather, Loader2, ArrowLeft, Mail } from 'lucide-react'
import axios from 'axios'
import {
  formCard,
  formTitle,
  labelClass,
  inputClass,
  formGroup,
  submitBtn,
  errorClass,
  successClass,
  linkClass,
  bodyText,
} from '../styles/common'

function ForgotPass() {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setServerError('')
    setLoading(true)
    try {
      // Call forgot-password endpoint when implemented
      await axios.post('/auth/forgot-password', { email: data.email })
      setSubmitted(true)
    } catch (err) {
      // Show success even on 404 to prevent email enumeration
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-52px)] flex items-center justify-center px-4 py-12 bg-white">
      <div className={`${formCard} w-full max-w-sm`}>
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Feather className="w-6 h-6 text-[#0066cc]" strokeWidth={2} />
          <span className="text-xl font-bold text-[#1d1d1f] tracking-tight">Taskify</span>
        </div>

        {submitted ? (
          /* Success state */
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#34c759]/10 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 text-[#248a3d]" />
            </div>
            <h1 className="text-xl font-bold text-[#1d1d1f] tracking-tight mb-3">Check your inbox</h1>
            <p className={`${bodyText} mb-6`}>
              If an account exists for that email, we've sent a password reset link. Check your
              spam folder if you don't see it.
            </p>
            <NavLink to="/login" className={linkClass}>
              ← Back to sign in
            </NavLink>
          </div>
        ) : (
          /* Form state */
          <>
            <h1 className={formTitle}>Reset your password</h1>
            <p className={`${bodyText} text-center mb-7 -mt-4`}>
              Enter the email linked to your account and we'll send a reset link.
            </p>

            {serverError && (
              <div className={`${errorClass} mb-5`} role="alert">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={formGroup}>
                <label htmlFor="forgot-email" className={labelClass}>
                  Email address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${inputClass} ${errors.email ? 'border-[#ff3b30]' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-[#cc2f26] text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <button
                id="forgot-submit-btn"
                type="submit"
                disabled={loading}
                className={`${submitBtn} flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-[#6e6e73]">
              <NavLink to="/login" className={`${linkClass} flex items-center justify-center gap-1`}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </NavLink>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPass