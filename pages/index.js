// pages/index.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Проверка авторизации
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return <p style={{ padding: '2rem' }}>Загрузка...</p>

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🏁 Добро пожаловать, {user.email}!</h1>

      <button onClick={() => router.push('/game')} style={btnStyle}>Играть</button>
      <button onClick={() => alert('Профиль в разработке')} style={btnStyle}>Профиль</button>
      <button onClick={handleLogout} style={btnStyle}>Выйти</button>
    </div>
  )
}

const btnStyle = {
  marginTop: '1rem',
  marginRight: '1rem',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '6px',
  background: '#333',
  color: '#fff',
  border: 'none',
}

