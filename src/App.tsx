import React, { useState } from "react";
import { User, Mail, Lock, UserPlus, LogIn, GraduationCap } from "lucide-react";
export function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    curso: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <main className="flex w-full min-h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#009CA6] mb-2">
            {isLogin ? "Iniciar Sesión" : "Registro de Estudiante"}
          </h1>
          <p className="text-gray-600">Sistema de Comedor Escolar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nombre">
                  Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="nombre" name="nombre" type="text" required value={formData.nombre} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="Tu nombre" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="apellidos">
                  Apellidos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="apellidos" name="apellidos" type="text" required value={formData.apellidos} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="Tus apellidos" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="curso">
                  Curso
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <select id="curso" name="curso" required value={formData.curso} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6] appearance-none bg-white">
                    <option value="">Selecciona tu curso</option>
                    <optgroup label="Primaria">
                      <option value="1P">1º Primaria</option>
                      <option value="2P">2º Primaria</option>
                      <option value="3P">3º Primaria</option>
                      <option value="4P">4º Primaria</option>
                      <option value="5P">5º Primaria</option>
                      <option value="6P">6º Primaria</option>
                    </optgroup>
                    <optgroup label="ESO">
                      <option value="1E">1º ESO</option>
                      <option value="2E">2º ESO</option>
                      <option value="3E">3º ESO</option>
                      <option value="4E">4º ESO</option>
                    </optgroup>
                    <optgroup label="Bachillerato">
                      <option value="1B">1º Bachillerato</option>
                      <option value="2B">2º Bachillerato</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="tu@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#009CA6] focus:border-[#009CA6]" placeholder="••••••••" minLength={6} />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#009CA6] text-white p-2 rounded-md hover:bg-[#008791] flex items-center justify-center gap-2">
            {isLogin ? <>
                <LogIn className="h-5 w-5" />
                Iniciar Sesión
              </> : <>
                <UserPlus className="h-5 w-5" />
                Completar Registro
              </>}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#009CA6] hover:underline">
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </main>;
}