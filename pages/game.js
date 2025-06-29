// pages/game.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function GamePage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <p>Загрузка...</p>

  // 👇 Вот кнопка выхода — добавляем в return()
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Добро пожаловать в игру!</h1>
      <p>Тут скоро появится ваша настоящая игра!</p>

      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
        style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}
      >
        Выйти
      </button>
    </div>
  )
}
