import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AppContainer from './pages/AppContainer';
import { setNavigate } from './lib/navigation';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import AdminPanel from './pages/AdminPanel';
import { useEffect } from 'react';
import BlogPanel from './pages/BlogPanel';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [])

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/admin/dashboard" element={<AdminPanel />}>
            <Route path='/admin/dashboard/blogs' element={<BlogPanel />}/>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
