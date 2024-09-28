import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Add product thunk
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data , { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/product", data);
            return response.data;  // Ensure you return the added product data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get all products thunk
export const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/product");
            const updateProducts = response.data.data.map((item, i) => {
                return { ...item, id: i + 1 };  // Sequential ID for frontend, MongoDB _id is kept for backend
            });
            return updateProducts;  // Return products with sequential id
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update product thunk
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // For image uploads
                },
            });
            return response.data;  // Return the updated product
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      return id; // Return the deleted product's ID to remove it from the store
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
    isLoading: false,
    error: null,
    products: [],
    isProductAdded: false
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add product
            .addCase(addProduct.pending, (state) => {
                state.isProductAdded = false;
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isProductAdded = true;
                state.isLoading = false;
                state.error = null;
                state.products.push({ ...action.payload, id: state.products.length + 1 });  // Add with sequential ID
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add product';
            })

            // Get all products
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch products';
            })

            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.products.findIndex(product => product._id === action.payload._id);  // Use original MongoDB ID
                if (index !== -1) {
                    state.products[index] = { ...action.payload, id: state.products[index].id };  // Maintain sequential ID
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update product';
            })
            .addCase(deleteProduct.pending, (state) => {
              state.isLoading = true; // Set loading to true while deleting
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
              state.isLoading = false; // Reset loading after deletion
              state.products = state.products.filter(product => product._id !== action.payload); // Remove deleted product
              state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
              state.isLoading = false; // Reset loading even if there's an error
              state.error = action.payload || "Failed to delete product";
            });
    }
});

export default productSlice.reducer;
