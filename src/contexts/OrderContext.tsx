import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
export interface Order {
  id: string;
  userId: string;
  studentName: string;
  course: string;
  date: string;
  menuType: 'firstAndDessert' | 'secondAndDessert' | 'complete';
  firstCourse?: string;
  secondCourse?: string;
  dessert: string;
  hasTupperware: boolean;
  createdAt: string;
}
interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => void;
  getUserOrders: () => Order[];
  getAllOrders: () => Order[];
}
const OrderContext = createContext<OrderContextType | undefined>(undefined);
export function OrderProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const {
    user
  } = useAuth();
  useEffect(() => {
    // Cargar pedidos del localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, newOrder];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };
  const getUserOrders = () => {
    return orders.filter(order => order.userId === user?.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };
  const getAllOrders = () => {
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };
  return <OrderContext.Provider value={{
    orders,
    createOrder,
    getUserOrders,
    getAllOrders
  }}>
      {children}
    </OrderContext.Provider>;
}
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};