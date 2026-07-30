import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './store/AuthContext'

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      
      {/* Protected Home Route for now */}
      <Route path="/" element={
        isAuthenticated ? (
          <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
              <p className="text-gray-600 mb-8">Welcome to SkillSwap! You are successfully logged in.</p>
              <button 
                onClick={logout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  )
}

export default App
