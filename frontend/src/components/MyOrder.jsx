import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';

const MyOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="order-container max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-xl mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Orders</h2>
      
      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">You have no orders yet!</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li 
              key={order.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800">Order #{order.id}</h3>
              <p className="text-gray-600 mt-2">Total: ₹{order.total.toFixed(2)}</p>
              <p className="text-gray-600 mt-1">Status: {order.status}</p>
              <ul className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <li 
                    key={item.id} 
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-500">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrder;
