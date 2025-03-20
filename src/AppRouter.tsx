import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Welcome } from "./pages/Welcome";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import { ChangePassword } from "./pages/ChangePassword";
import { Navigation } from "./components/Navigation";
export function AppRouter() {
  return <Router>
      <div className="pb-16 md:pt-16 md:pb-0">
        <Navigation />
        <Routes>
          <Route path="/login" element={<App />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/menu" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings/password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>;
}