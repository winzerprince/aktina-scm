
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
};

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(
    // Ensure all order objects are strictly typed on init
    ordersJson.map((order) => ({
      ...order,
      status: order.status as OrderStatus,
      priority: order.priority as OrderPriority,
    }))
  );

  // Accept order: status becomes 'accepted', track previous status
  const acceptOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, previousStatus: order.status, status: 'accepted' }
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

  return {
    orders,
    setOrders,
    acceptOrder,
    rejectOrder,
    undoOrder,
    orderCount: orders.length,
    pendingCount: orders.filter((o) => o.status === 'pending').length,
  };
};

export default useOrders;
