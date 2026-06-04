import { useState } from 'react'
import '../pages/Register.css'

function Register({ onNavigate }) {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Minimum 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.role) e.role = 'Please select a role'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => onNavigate && onNavigate('dashboard'), 1200)
  }

  const strength = () => {
    const p = form.password; let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }
  const score = strength()
  const sColors = ['', '#ff4444', '#ff9800', '#43e97b', '#6c63ff']
  const sLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="reg-page">
      <div className="reg-blob reg-blob-1" />
      <div className="reg-blob reg-blob-2" />
      <div className="reg-grid" />
      <div className="reg-container">
        <div className="reg-brand">
          <div className="reg-brand-mark">DA</div>
          <span className="reg-brand-name">DevAssess</span>
          <span className="reg-brand-tag">Register</span>
        </div>

        <div className="reg-card">
          <h1 className="reg-title">Create account</h1>
          <p className="reg-subtitle">Join the development assessment platform</p>

          {success ? (
            <div className="reg-success">
              <div className="reg-success-icon">✓</div>
              <p>Account created! Redirecting…</p>
            </div>
          ) : (
            <form className="reg-form" onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="reg-field">
                <label className="reg-label">Full Name</label>
                <div className={`reg-input-wrap ${errors.fullName ? 'err' : ''}`}>
                  <span className="reg-icon">👤</span>
                  <input className="reg-input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Alex Johnson" autoComplete="off" />
                </div>
                {errors.fullName && <span className="reg-error">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div className="reg-field">
                <label className="reg-label">Email Address</label>
                <div className={`reg-input-wrap ${errors.email ? 'err' : ''}`}>
                  <span className="reg-icon">✉</span>
                  <input className="reg-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="alex@example.com" autoComplete="off" />
                </div>
                {errors.email && <span className="reg-error">{errors.email}</span>}
              </div>

              {/* Password + strength */}
              <div className="reg-field">
                <label className="reg-label">Password</label>
                <div className={`reg-input-wrap ${errors.password ? 'err' : ''}`}>
                  <span className="reg-icon">🔒</span>
                  <input className="reg-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" />
                </div>
                {errors.password && <span className="reg-error">{errors.password}</span>}
                {form.password && (
                  <div className="strength-wrap">
                    <div className="strength-bars">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="strength-bar" style={{ background: i <= score ? sColors[score] : 'var(--border)' }} />
                      ))}
                    </div>
                    <span className="strength-text" style={{ color: sColors[score] }}>{sLabels[score]}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="reg-field">
                <label className="reg-label">Confirm Password</label>
                <div className={`reg-input-wrap ${errors.confirmPassword ? 'err' : ''}`}>
                  <span className="reg-icon">🔑</span>
                  <input className="reg-input" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" />
                </div>
                {errors.confirmPassword && <span className="reg-error">{errors.confirmPassword}</span>}
              </div>

              {/* Role */}
              <div className="reg-field">
                <label className="reg-label">Role</label>
                <div className={`reg-input-wrap ${errors.role ? 'err' : ''}`}>
                  <span className="reg-icon">🎭</span>
                  <select className="reg-select" name="role" value={form.role} onChange={handleChange}>
                    <option value="">Select your role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Project Manager</option>
                    <option value="tester">QA Engineer</option>
                    <option value="devops">DevOps Engineer</option>
                  </select>
                </div>
                {errors.role && <span className="reg-error">{errors.role}</span>}
              </div>

              <button type="submit" className="reg-btn" disabled={loading}>
                {loading ? <span className="reg-spinner" /> : 'Create Account →'}
              </button>

              <p className="reg-switch">
                Already have an account?{' '}
                <span className="reg-link" onClick={() => onNavigate && onNavigate('login')}>Sign in</span>
              </p>
            </form>
          )}
        </div>

        <p className="reg-footer">Round 2 · Development Assessment · 2026</p>
      </div>
    </div>
  )
}

export default Register
