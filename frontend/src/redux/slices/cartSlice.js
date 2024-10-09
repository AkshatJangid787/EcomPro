// cartSlice.js corrections
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/cart/add', 
            { productId, quantity }, 
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/cart/${productId}`,
                { quantity },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
      try {
          const response = await axios.delete('http://localhost:5000/api/cart/clear', {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.items.reduce(
                    (total, item) => total + (item.quantity * item.productId.price), 
                    0
                );
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch cart';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.items.reduce(
                    (total, item) => total + (item.quantity * item.productId.price), 
                    0
                );
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.items.reduce(
                    (total, item) => total + (item.quantity * item.productId.price), 
                    0
                );
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.items.reduce(
                    (total, item) => total + (item.quantity * item.productId.price), 
                    0
                );
            })
            .addCase(clearCart.fulfilled, (state) => {
              state.items = [];
              state.total = 0;
          })
          .addCase(clearCart.rejected, (state, action) => {
              state.error = action.payload?.message || 'Failed to clear cart';
          });
    },
});

export default cartSlice.reducer;