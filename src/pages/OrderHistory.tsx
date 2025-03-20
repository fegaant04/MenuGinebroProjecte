import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
// Mock data for orders history
const MOCK_ORDERS = [{
  id: 1,
  date: "2024-01-15",
  meals: {
    firstCourse: "Sopa de Verduras",
    secondCourse: "Pollo al Horno",
    dessert: "Fruta del Tiempo"
  },
  hasTupperware: true
}, {
  id: 2,
  date: "2024-01-16",
  meals: {
    firstCourse: "Ensalada Mixta",
    secondCourse: "Pescado a la Plancha",
    dessert: "Yogur Natural"
  },
  hasTupperware: false
}, {
  id: 3,
  date: "2024-01-17",
  meals: {
    firstCourse: "Sopa de Verduras",
    secondCourse: "Pescado a la Plancha",
    dessert: "Fruta del Tiempo"
  },
  hasTupperware: true
}];
export function OrderHistory() {
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const toggleOrder = (orderId: number) => {
    setExpandedOrders(prev => prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]);
  };
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#009CA6] mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Historial de Pedidos
          </h1>
          <div className="space-y-4">
            {MOCK_ORDERS.map(order => <div key={order.id} className="border rounded-lg overflow-hidden">
                <button onClick={() => toggleOrder(order.id)} className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="font-medium capitalize">
                      {formatDate(order.date)}
                    </span>
                  </div>
                  {expandedOrders.includes(order.id) ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {expandedOrders.includes(order.id) && <div className="p-4 border-t bg-gray-50">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">
                          Primer Plato:
                        </span>
                        <p className="font-medium">{order.meals.firstCourse}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Segundo Plato:
                        </span>
                        <p className="font-medium">
                          {order.meals.secondCourse}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Postre:</span>
                        <p className="font-medium">{order.meals.dessert}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="h-4 w-4" />
                        {order.hasTupperware ? "Con táper" : "Sin táper"}
                      </div>
                    </div>
                  </div>}
              </div>)}
          </div>
        </div>
      </div>
    </main>;
}