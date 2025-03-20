import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus, LogIn, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    curso: ''
  });
  const [error, setError] = useState('');
  const {
    login,
    register,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      navigate('/');
    } catch (err) {
      setError('Error al procesar la solicitud');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <main className="flex w-full min-h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg p-8">
        {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#009CA6] mb-2">
            {isLogin ? 'Iniciar Sesión' : 'Registro de Estudiante'}
          </h1>
          <p className="text-gray-600">Sistema de Comedor Escolar</p>
        </div>
        {/* Rest of your existing form code */}
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
              {/* Rest of your registration fields */}
            </>}
          {/* Email and password fields */}
          <button type="submit" disabled={isLoading} className="w-full bg-[#009CA6] text-white p-2 rounded-md hover:bg-[#008791] flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : isLogin ? <>
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
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </main>;
}