import React from "react";
import { Utensils, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
const MOCK_USER = {
  nombre: "Marc",
  curso: "2º ESO"
};
export function Welcome() {
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#009CA6] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div>
                <p className="text-white/80">¡Bienvenido!</p>
                <h1 className="text-2xl font-bold">{MOCK_USER.nombre}</h1>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="max-w-md mx-auto text-center space-y-8">
              <div className="space-y-2">
                <Utensils className="h-16 w-16 mx-auto text-[#009CA6]" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Comedor Escolar
                </h2>
                <p className="text-gray-600">
                  Selecciona tu menú para hoy y disfruta de una comida saludable
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Tu curso actual</p>
                <p className="text-lg font-medium text-gray-800">
                  {MOCK_USER.curso}
                </p>
              </div>
              <Link to="/menu" className="block w-full bg-[#009CA6] text-white p-4 rounded-lg hover:bg-[#008791] transition-colors flex items-center justify-center gap-2">
                Seleccionar Menú
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>;
}