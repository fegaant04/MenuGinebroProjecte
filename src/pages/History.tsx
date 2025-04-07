import React from 'react';
import { Calendar, Clock, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
export function History() {
  const {
    getUserOrders
  } = useOrders();
  const orders = getUserOrders();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#009CA6] flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Historial de Pedidos
          </h1>
          <Link to="/menu" className="text-[#009CA6] hover:underline flex items-center gap-2">
            Nuevo Pedido
          </Link>
        </div>
        {orders.length === 0 ? <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
            No tienes pedidos realizados
          </div> : <div className="space-y-4">
            {orders.map(order => <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span className="capitalize">{formatDate(order.date)}</span>
                  </div>
                  {order.hasTupperware && <div className="flex items-center gap-2 text-[#009CA6]">
                      <Package className="h-5 w-5" />
                      <span>Táper</span>
                    </div>}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {order.firstCourse && <div className="space-y-1">
                      <p className="text-sm text-gray-500">Primer Plato</p>
                      <p className="font-medium">{order.firstCourse}</p>
                    </div>}
                  {order.secondCourse && <div className="space-y-1">
                      <p className="text-sm text-gray-500">Segundo Plato</p>
                      <p className="font-medium">{order.secondCourse}</p>
                    </div>}
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Postre</p>
                    <p className="font-medium">{order.dessert}</p>
                  </div>
                </div>
              </div>)}
          </div>}
      </div>
    </main>;
}