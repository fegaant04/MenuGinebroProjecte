import React, { useState } from 'react';
import { Calendar, Image, Filter, Download, ChevronRight, Package } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext';
type TabType = 'daily' | 'monthly' | 'yearly' | 'images';
type FilterPeriod = 'day' | 'month' | 'year';
interface MealRequest {
  id: number;
  studentName: string;
  course: string;
  date: string;
  firstCourse: string;
  secondCourse: string;
  dessert: string;
  hasTupperware: boolean;
}
// Mock data
const MOCK_REQUESTS: MealRequest[] = [{
  id: 1,
  studentName: 'Marc García',
  course: '2º ESO',
  date: '2024-01-15',
  firstCourse: 'Sopa de Verduras',
  secondCourse: 'Pollo al Horno',
  dessert: 'Fruta del Tiempo',
  hasTupperware: true
}
// ... más datos mock
];
export function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const {
    getAllOrders
  } = useOrders();
  const orders = getAllOrders();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log('Imágenes seleccionadas:', files);
    }
  };
  const exportData = () => {
    console.log('Exportando datos...');
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b overflow-x-auto">
            <div className="flex whitespace-nowrap">
              <button onClick={() => setActiveTab('daily')} className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base ${activeTab === 'daily' ? 'border-b-2 border-[#009CA6] text-[#009CA6]' : 'text-gray-500 hover:text-[#009CA6]'}`}>
                Diario
              </button>
              <button onClick={() => setActiveTab('monthly')} className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base ${activeTab === 'monthly' ? 'border-b-2 border-[#009CA6] text-[#009CA6]' : 'text-gray-500 hover:text-[#009CA6]'}`}>
                Mensual
              </button>
              <button onClick={() => setActiveTab('yearly')} className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base ${activeTab === 'yearly' ? 'border-b-2 border-[#009CA6] text-[#009CA6]' : 'text-gray-500 hover:text-[#009CA6]'}`}>
                Anual
              </button>
              <button onClick={() => setActiveTab('images')} className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base ${activeTab === 'images' ? 'border-b-2 border-[#009CA6] text-[#009CA6]' : 'text-gray-500 hover:text-[#009CA6]'}`}>
                Imágenes
              </button>
            </div>
          </div>
          {/* Content Area */}
          <div className="p-4 sm:p-6">
            {activeTab === 'images' ? <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8">
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 space-y-4">
                      <div className="max-w-sm mx-auto space-y-3">
                        <p className="text-sm text-gray-600 font-medium">
                          Formato requerido:
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <code className="text-sm text-gray-800 font-mono">
                            horari_menu_1-7_enero_2025
                          </code>
                          <div className="mt-3 text-left">
                            <p className="text-xs text-gray-500 mb-2">
                              Estructura del nombre:
                            </p>
                            <div className="space-y-2 text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <span className="text-[#009CA6]">
                                  horari_menu
                                </span>
                                <span className="text-gray-400">→</span>
                                <span>Prefijo fijo</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#009CA6]">1-7</span>
                                <span className="text-gray-400">→</span>
                                <span>Rango de días (del-al)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#009CA6]">enero</span>
                                <span className="text-gray-400">→</span>
                                <span>Mes en minúsculas</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#009CA6]">2025</span>
                                <span className="text-gray-400">→</span>
                                <span>Año</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="file-upload" className="cursor-pointer bg-[#009CA6] text-white px-4 py-2 rounded-md hover:bg-[#008791] transition-colors inline-flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          Subir Imágenes
                        </label>
                        <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </div>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </div>
                </div>
                {/* Image Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {/* Preview images would be mapped here */}
                </div>
              </div> : <>
                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Filter className="h-5 w-5 text-gray-400" />
                    {activeTab === 'daily' && <input type="date" value={selectedDate.toISOString().slice(0, 10)} onChange={e => setSelectedDate(new Date(e.target.value))} className="border rounded-md p-2 w-full sm:w-auto" />}
                    {activeTab === 'monthly' && <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="border rounded-md p-2 w-full sm:w-auto" />}
                    {activeTab === 'yearly' && <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="border rounded-md p-2 w-full sm:w-auto">
                        {Array.from({
                    length: 5
                  }, (_, i) => new Date().getFullYear() - i).map(year => <option key={year} value={year}>
                            {year}
                          </option>)}
                      </select>}
                  </div>
                  <button onClick={exportData} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#009CA6] text-white rounded-md hover:bg-[#008791] transition-colors w-full sm:w-auto">
                    <Download className="h-4 w-4" />
                    Exportar
                  </button>
                </div>
                {/* Table (Desktop) / Cards (Mobile) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estudiante
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Curso
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Primer Plato
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Segundo Plato
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Postre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Táper
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(request => <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.studentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.course}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(request.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.firstCourse}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.secondCourse}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.dessert}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.hasTupperware ? 'Sí' : 'No'}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {orders.map(request => <div key={request.id} className="bg-white border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.studentName}</h3>
                          <p className="text-sm text-gray-500">
                            {request.course}
                          </p>
                        </div>
                        {request.hasTupperware && <Package className="h-5 w-5 text-[#009CA6]" />}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(request.date)}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Primer Plato</p>
                          <p className="text-sm">{request.firstCourse}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Segundo Plato</p>
                          <p className="text-sm">{request.secondCourse}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Postre</p>
                          <p className="text-sm">{request.dessert}</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </>}
          </div>
        </div>
      </div>
    </main>;
}