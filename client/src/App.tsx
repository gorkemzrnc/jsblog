import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/main/Home';
import AppContainer from './pages/main/MainContainer';
import { setNavigate } from './lib/navigation';
import { AuthProvider } from './providers/AuthProvider';
import SignUp from './pages/auth/SignUp';
import AdminPanel from './pages/admin/AdminContainer';
import { useEffect } from 'react';
import BlogPanel from './pages/admin/BlogPanel';
import Article from './pages/main/Article';
import RedirectIfAuthenticated from './components/routing/authenticate/RedirectIfAuthenticated';
import { ToastProvider } from './providers/ToastProvider';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [])

  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<AppContainer />}>
              <Route index element={<Home />} />
              <Route path='/article/:id' element={<Article />} />
            </Route>
            <Route path="/admin/dashboard" element={<AdminPanel />}>
              <Route path='/admin/dashboard/blogs' element={<BlogPanel />} />
            </Route>
            <Route path='/login' element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            } />
            <Route path='/signup' element={
              <RedirectIfAuthenticated>
                <SignUp />
              </RedirectIfAuthenticated>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default App
