import React, { useMemo, useState } from 'react';
import { Calendar, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
interface MealOption {
  id: number;
  name: string;
}
type MenuType = 'firstAndDessert' | 'secondAndDessert' | 'complete' | null;
const MOCK_MEALS = {
  firstCourse: [{
    id: 1,
    name: 'Sopa de Verduras'
  }, {
    id: 2,
    name: 'Ensalada Mixta'
  }],
  secondCourse: [{
    id: 1,
    name: 'Pollo al Horno'
  }, {
    id: 2,
    name: 'Pescado a la Plancha'
  }],
  dessert: [{
    id: 1,
    name: 'Fruta del Tiempo'
  }, {
    id: 2,
    name: 'Yogur Natural'
  }]
};
export function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menuType, setMenuType] = useState<MenuType>(null);
  const [selections, setSelections] = useState({
    firstCourse: null as number | null,
    secondCourse: null as number | null,
    dessert: null as number | null,
    hasTupperware: false
  });
  const {
    createOrder
  } = useOrders();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const weekDays = useMemo(() => {
    const currentDate = new Date(selectedDate);
    const currentDay = currentDate.getDay();
    const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(currentDate.setDate(diff));
    const days = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push(day);
    }
    return days;
  }, [selectedDate]);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const formatWeekday = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short'
    });
  };
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric'
    });
  };
  const previousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };
  const nextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };
  const WeekSelector = () => <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={previousWeek} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-sm text-gray-600">
          Semana del{' '}
          {weekDays[0].toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long'
        })}
        </span>
        <button onClick={nextWeek} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {weekDays.map(date => {
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isToday = date.toDateString() === new Date().toDateString();
        return <button key={date.toISOString()} onClick={() => setSelectedDate(date)} className={`p-3 rounded-lg text-center transition-colors ${isSelected ? 'bg-[#009CA6] text-white' : isToday ? 'bg-[#009CA6]/10 text-[#009CA6]' : 'hover:bg-gray-50'}`}>
              <span className="block text-xs uppercase font-medium mb-1">
                {formatWeekday(date)}
              </span>
              <span className={`text-lg ${isSelected ? 'font-bold' : ''}`}>
                {formatDay(date)}
              </span>
            </button>;
      })}
      </div>
    </div>;
  const handleSelection = (type: 'firstCourse' | 'secondCourse' | 'dessert', id: number) => {
    setSelections(prev => ({
      ...prev,
      [type]: id
    }));
  };
  const toggleTupperware = () => {
    setSelections(prev => ({
      ...prev,
      hasTupperware: !prev.hasTupperware
    }));
  };
  const MenuTypeSelector = () => <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Selecciona tu tipo de menú
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button onClick={() => setMenuType('firstAndDessert')} className={`p-4 rounded-lg border text-center ${menuType === 'firstAndDessert' ? 'border-[#009CA6] bg-[#009CA6] text-white' : 'border-gray-200 hover:border-[#009CA6]'} transition-colors`}>
          <span className="block font-medium">Primer Plato + Postre</span>
        </button>
        <button onClick={() => setMenuType('secondAndDessert')} className={`p-4 rounded-lg border text-center ${menuType === 'secondAndDessert' ? 'border-[#009CA6] bg-[#009CA6] text-white' : 'border-gray-200 hover:border-[#009CA6]'} transition-colors`}>
          <span className="block font-medium">Segundo Plato + Postre</span>
        </button>
        <button onClick={() => setMenuType('complete')} className={`p-4 rounded-lg border text-center ${menuType === 'complete' ? 'border-[#009CA6] bg-[#009CA6] text-white' : 'border-gray-200 hover:border-[#009CA6]'} transition-colors`}>
          <span className="block font-medium">Menú Completo</span>
          <span className="text-sm block mt-1">1º + 2º Plato + Postre</span>
        </button>
      </div>
    </div>;
  const MealSelector = ({
    title,
    options,
    selected,
    type
  }: {
    title: string;
    options: MealOption[];
    selected: number | null;
    type: 'firstCourse' | 'secondCourse' | 'dessert';
  }) => <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map(option => <button key={option.id} onClick={() => handleSelection(type, option.id)} className={`p-4 rounded-lg border ${selected === option.id ? 'border-[#009CA6] bg-[#009CA6] text-white' : 'border-gray-200 hover:border-[#009CA6]'} transition-colors`}>
            {option.name}
          </button>)}
      </div>
    </div>;
  const handleConfirmOrder = () => {
    let isValid = selections.dessert !== null;
    if (menuType === 'firstAndDessert') {
      isValid = isValid && selections.firstCourse !== null;
    } else if (menuType === 'secondAndDessert') {
      isValid = isValid && selections.secondCourse !== null;
    } else if (menuType === 'complete') {
      isValid = isValid && selections.firstCourse !== null && selections.secondCourse !== null;
    }
    if (!isValid || !menuType) {
      alert('Por favor, selecciona todos los platos requeridos');
      return;
    }
    const orderData = {
      userId: user.id,
      studentName: `${user.nombre} ${user.apellidos}`,
      course: user.curso,
      date: selectedDate.toISOString(),
      menuType,
      firstCourse: selections.firstCourse ? MOCK_MEALS.firstCourse.find(m => m.id === selections.firstCourse)?.name : undefined,
      secondCourse: selections.secondCourse ? MOCK_MEALS.secondCourse.find(m => m.id === selections.secondCourse)?.name : undefined,
      dessert: MOCK_MEALS.dessert.find(m => m.id === selections.dessert)!.name,
      hasTupperware: selections.hasTupperware
    };
    createOrder(orderData);
    navigate('/history');
  };
  return <main className="min-h-screen bg-[#f5f5f5] w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#009CA6] flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            Selección de Menú
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <WeekSelector />
          <div className="mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span className="capitalize">{formatDate(selectedDate)}</span>
            </div>
          </div>
          <MenuTypeSelector />
          {menuType && <div className="space-y-6">
              {(menuType === 'firstAndDessert' || menuType === 'complete') && <MealSelector title="Primer Plato" options={MOCK_MEALS.firstCourse} selected={selections.firstCourse} type="firstCourse" />}
              {(menuType === 'secondAndDessert' || menuType === 'complete') && <MealSelector title="Segundo Plato" options={MOCK_MEALS.secondCourse} selected={selections.secondCourse} type="secondCourse" />}
              <MealSelector title="Postre" options={MOCK_MEALS.dessert} selected={selections.dessert} type="dessert" />
              <div className="border-t pt-6">
                <button onClick={toggleTupperware} className={`flex items-center gap-2 p-4 rounded-lg border w-full justify-center ${selections.hasTupperware ? 'border-[#009CA6] bg-[#009CA6] text-white' : 'border-gray-200 hover:border-[#009CA6]'} transition-colors`}>
                  <div className="h-5 w-5" />
                  {selections.hasTupperware ? 'Llevaré Táper' : '¿Vas a traer Táper?'}
                </button>
              </div>
              <button className="w-full bg-[#009CA6] text-white p-4 rounded-lg hover:bg-[#008791] transition-colors" onClick={handleConfirmOrder}>
                Confirmar Selección
              </button>
            </div>}
        </div>
      </div>
    </main>;
}