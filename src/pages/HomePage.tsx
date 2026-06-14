import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ThemeToggle } from '../components/ThemeToggle'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  function handleSignOut() {
    setUser(null)
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.card}>
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            className={styles.avatar}
            referrerPolicy="no-referrer"
          />
        )}
        <h1 className={styles.welcome}>Welcome, {user.name}!</h1>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user.email}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>UUID</span>
            <span className={styles.valueCode}>{user.uuid}</span>
          </div>
        </div>
        <button className={styles.signOut} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  )
}
