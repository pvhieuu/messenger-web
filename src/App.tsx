import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import { accessTokenSelector } from './components/FormLogin/selectors'

function App() {
  const accessToken = useSelector(accessTokenSelector)

  return (
    <Routes>
      <Route
        path='/login'
        element={accessToken ? <Navigate to='/dashboard' /> : <Login />}
      />
      <Route
        path='/register'
        element={accessToken ? <Navigate to='/dashboard' /> : <Register />}
      />
      <Route
        path='/dashboard'
        element={accessToken ? <Dashboard /> : <Navigate to='/login' />}
      />
      <Route
        path='*'
        element={
          accessToken ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
        }
      />
    </Routes>
  )
}

export default App
