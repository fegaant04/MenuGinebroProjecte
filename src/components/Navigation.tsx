import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, Utensils, User, Settings } from "lucide-react";
export function Navigation() {
  const location = useLocation();
  const isAdmin = true;
  const getActiveClass = (path: string) => location.pathname === path ? "text-[#009CA6]" : "text-gray-600 hover:text-[#009CA6]";
  return <nav className="bg-white shadow-md fixed bottom-0 w-full md:top-0 md:bottom-auto">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <Link to="/" className={`flex items-center gap-2 p-2 rounded-lg ${getActiveClass("/")}`}>
            <Utensils className="h-5 w-5" />
            <span className="hidden md:inline">Menú</span>
          </Link>
          <Link to="/history" className={`flex items-center gap-2 p-2 rounded-lg ${getActiveClass("/history")}`}>
            <Clock className="h-5 w-5" />
            <span className="hidden md:inline">Historial</span>
          </Link>
          {isAdmin && <Link to="/admin" className={`flex items-center gap-2 p-2 rounded-lg ${getActiveClass("/admin")}`}>
              <Settings className="h-5 w-5" />
              <span className="hidden md:inline">Admin</span>
            </Link>}
          <Link to="/profile" className={`flex items-center gap-2 p-2 rounded-lg ${getActiveClass("/profile")}`}>
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>;
}