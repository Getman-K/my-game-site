// pages/login.js
import { useState } from 'react'
import { signIn, signUp, signOut } from '../lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login') // или 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (mode === 'signup') {
        await signUp(email, password)
        alert('Письмо с подтверждением отправлено!')
      } else {
        await signIn(email, password)
        alert('Успешный вход')
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{mode === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">{mode === 'signup' ? 'Зарегистрироваться' : 'Войти'}</button>
      </form>
      <br />
      <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
        Переключиться на {mode === 'signup' ? 'вход' : 'регистрацию'}
      </button>
    </div>
  )
}
