import React, { useState } from "react";
import { User, GraduationCap, Mail, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoutDialog } from "../components/LogoutDialog";

// Mock user data - In a real app, this would come from your auth system
const MOCK_USER = {
  nombre: "Marc",
  apellidos: "García Fernández",
  email: "marc.garcia@ejemplo.com",
  curso: "2º ESO"
};
export function Profile() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout confirmed");
    setShowLogoutDialog(false);
  };
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#009CA6] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {MOCK_USER.nombre} {MOCK_USER.apellidos}
                </h1>
                <p className="text-white/80">Estudiante</p>
              </div>
            </div>
          </div>
          {/* Information Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Información Personal
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <GraduationCap className="h-5 w-5" />
                <span>Curso: {MOCK_USER.curso}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{MOCK_USER.email}</span>
              </div>
            </div>
            {/* Actions Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Configuración
              </h2>
              <div className="space-y-2">
                <Link to="/settings" className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Settings className="h-5 w-5" />
                    <span>Cambiar contraseña</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                <button onClick={() => setShowLogoutDialog(true)} className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogoutDialog isOpen={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} onConfirm={handleLogout} />
    </main>;
}