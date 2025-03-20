import React, { useState } from "react";
import { Lock, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
export function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password change submitted:", formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#009CA6] p-6 text-white">
            <div className="flex items-center gap-4">
              <Link to="/profile" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold">Cambiar Contraseña</h1>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currentPassword">
                  Contraseña Actual
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="currentPassword" name="currentPassword" type="password" required value={formData.currentPassword} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="••••••••" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="newPassword" name="newPassword" type="password" required value={formData.newPassword} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="••••••••" minLength={6} />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Mínimo 6 caracteres
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="••••••••" minLength={6} />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#009CA6] text-white p-3 rounded-md hover:bg-[#008791] transition-colors flex items-center justify-center gap-2">
                <Save className="h-5 w-5" />
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>;
}