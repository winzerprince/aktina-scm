
import { useState, useCallback } from 'react';

export type Customer = {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number;
  revenue: number;
  rating: number;
  status: 'active' | 'inactive' | 'premium';
  lastOrder: string;
  phoneNumber: string;
};

const initialCustomers: Customer[] = [
  {
    id: 'CUS-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    location: 'New York',
    orders: 15,
    revenue: 15800,
    rating: 4.9,
    status: 'premium',
    lastOrder: '2024-01-15',
    phoneNumber: '+1-555-0123'
  },
  {
    id: 'CUS-002',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    location: 'Los Angeles',
    orders: 11,
    revenue: 12500,
    rating: 4.8,
    status: 'active',
    lastOrder: '2024-01-12',
    phoneNumber: '+1-555-0124'
  },
  {
    id: 'CUS-003',
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    location: 'Chicago',
    orders: 9,
    revenue: 9800,
    rating: 4.7,
    status: 'active',
    lastOrder: '2024-01-10',
    phoneNumber: '+1-555-0125'
  },
  {
    id: 'CUS-004',
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    location: 'Miami',
    orders: 8,
    revenue: 9000,
    rating: 4.6,
    status: 'active',
    lastOrder: '2024-01-08',
    phoneNumber: '+1-555-0126'
  },
  {
    id: 'CUS-005',
    name: 'David Lee',
    email: 'david.lee@example.com',
    location: 'San Francisco',
    orders: 10,
    revenue: 11200,
    rating: 4.5,
    status: 'premium',
    lastOrder: '2024-01-14',
    phoneNumber: '+1-555-0127'
  },
  {
    id: 'CUS-006',
    name: 'Karen Davis',
    email: 'karen.davis@example.com',
    location: 'Seattle',
    orders: 7,
    revenue: 8400,
    rating: 4.8,
    status: 'active',
    lastOrder: '2024-01-09',
    phoneNumber: '+1-555-0128'
  }
];

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'premium'>('all');

  const updateCustomerStatus = useCallback((id: string, status: Customer['status']) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === id ? { ...customer, status } : customer
      )
    );
  }, []);

  const updateCustomerRating = useCallback((id: string, rating: number) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === id ? { ...customer, rating } : customer
      )
    );
  }, []);

  const addOrder = useCallback((customerId: string, orderValue: number) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { 
              ...customer, 
              orders: customer.orders + 1,
              revenue: customer.revenue + orderValue,
              lastOrder: new Date().toISOString().split('T')[0]
            } 
          : customer
      )
    );
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return {
    customers: filteredCustomers,
    allCustomers: customers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateCustomerStatus,
    updateCustomerRating,
    addOrder,
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    premiumCustomers: customers.filter(c => c.status === 'premium').length,
    averageRating: customers.reduce((sum, c) => sum + c.rating, 0) / customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + c.revenue, 0),
  };
};

export default useCustomers;
