import { useNavigate } from 'react-router-dom'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import { ThemeToggle } from '../components/ThemeToggle'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  async function handleSuccess(response: CredentialResponse) {
    if (!response.credential) return

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      })

      if (!res.ok) throw new Error('Auth failed')

      const { user } = await res.json()
      setUser(user)
      navigate('/home')
    } catch (err) {
      console.error('Login error:', err)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>Sign in to continue</p>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert('Google Sign-In failed')}
          useOneTap
        />
      </div>
    </div>
  )
}
