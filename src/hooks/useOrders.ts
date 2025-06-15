
import { useState, useCallback } from 'react';
import ordersJson from '../mock/orders.json';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'rejected' | 'accepted';
type OrderPriority = 'High' | 'Medium' | 'Low';

export type Order = {
  id: string;
  date: string;
  customer: string;
  products: string;
  quantity: number;
  value: number;
  status: OrderStatus;
  priority: OrderPriority;
  previousStatus?: OrderStatus;
  estimatedDelivery?: string;
  trackingNumber?: string;
};

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(
    ordersJson.map((order) => ({
      ...order,
      status: order.status as OrderStatus,
      priority: order.priority as OrderPriority,
      estimatedDelivery: '5-7 business days',
      trackingNumber: `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<OrderPriority | 'all'>('all');

  // Accept order: status becomes 'accepted', track previous status
  const acceptOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { 
              ...order, 
              previousStatus: order.status, 
              status: 'accepted',
              trackingNumber: `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
            }
          : order
      )
    );
  }, []);

  // Reject order: status becomes 'rejected', track previous status
  const rejectOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, previousStatus: order.status, status: 'rejected' }
          : order
      )
    );
  }, []);

  // Undo accept/reject: revert to previous status if available
  const undoOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id && order.previousStatus
          ? { ...order, status: order.previousStatus, previousStatus: undefined }
          : order
      )
    );
  }, []);

  // Start processing order
  const startProcessing = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: 'processing', estimatedDelivery: '3-5 business days' }
          : order
      )
    );
  }, []);

  // Ship order
  const shipOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { 
              ...order, 
              status: 'shipped', 
              estimatedDelivery: '1-3 business days',
              trackingNumber: `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
            }
          : order
      )
    );
  }, []);

  // Update priority
  const updatePriority = useCallback((id: string, priority: OrderPriority) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, priority } : order
      )
    );
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return {
    orders: filteredOrders,
    allOrders: orders,
    setOrders,
    acceptOrder,
    rejectOrder,
    undoOrder,
    startProcessing,
    shipOrder,
    updatePriority,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    orderCount: orders.length,
    pendingCount: orders.filter((o) => o.status === 'pending').length,
    processingCount: orders.filter((o) => o.status === 'processing').length,
    shippedCount: orders.filter((o) => o.status === 'shipped').length,
    deliveredCount: orders.filter((o) => o.status === 'delivered').length,
    acceptedCount: orders.filter((o) => o.status === 'accepted').length,
    rejectedCount: orders.filter((o) => o.status === 'rejected').length,
    totalValue: orders.reduce((sum, o) => sum + o.value, 0),
    highPriorityCount: orders.filter((o) => o.priority === 'High').length,
  };
};

export default useOrders;
