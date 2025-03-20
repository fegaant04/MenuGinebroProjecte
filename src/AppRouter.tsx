import React from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { Auth } from './pages/Auth';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { ChangePassword } from './pages/ChangePassword';
import { Navigation } from './components/Navigation';
export function AppRouter() {
  return <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<AuthGuard>
                <div className="pb-16 md:pt-16 md:pb-0">
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/menu" element={<Home />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/settings/password" element={<ChangePassword />} />
                  </Routes>
                </div>
              </AuthGuard>} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </AuthProvider>;
}