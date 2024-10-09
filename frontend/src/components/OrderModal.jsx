import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';

const OrderModal = ({ isOpen, onClose, order }) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConfirmOrder = async () => {
        if (!address || !paymentMethod) {
            setError('Please provide both address and payment method');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const completeOrder = {
                ...order,
                shippingAddress: address,
                paymentMethod,
            };
            
            await dispatch(placeOrder(completeOrder)).unwrap();
            await dispatch(clearCart()).unwrap();
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-2xl font-semibold mb-4">Confirm Your Order</h3>
                
                {error && (
                    <p className="text-red-500 mb-4 text-sm">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your shipping address"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                    </label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Payment Method</option>
                        <option value="COD">Cash on Delivery</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="DebitCard">Debit Card</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        disabled={loading || !address || !paymentMethod}
                        className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
                            loading || !address || !paymentMethod
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-700'
                        } transition-colors`}
                    >
                        {loading ? 'Placing Order...' : 'Confirm Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;