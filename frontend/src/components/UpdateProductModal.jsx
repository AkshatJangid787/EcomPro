import React, { useEffect } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateProduct , getAllProduct } from '../redux/slices/productSlice';

const UpdateProductModal = ({ open, setOpen, product }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    if (data.productImage) {
      formData.append("productImage", data.productImage[0]);
    }

    try {
      await dispatch(updateProduct({ id: product._id, data: formData }));
      // Dispatch getAllProduct after the update
      dispatch(getAllProduct());
      setOpen(false); // Close the modal after submitting
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (product) {
      reset(product); // Reset the form with product data when modal opens
    }
  }, [product, reset]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet variant="outlined" sx={{ minWidth: 300, p: 3, boxShadow: 'lg' }}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography component="h2" level="h4" sx={{ fontWeight: 'lg', mb: 1 }}>
          Update Product
        </Typography>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-5 my-5'>
              <div>
                <label className='text-sm block'>Product Name</label>
                <input type="text" className='p-2 py-1 border border-gray-800' {...register("name")} />
              </div>
              <div>
                <label className='text-sm block'>Price</label>
                <input type="text" className='p-2 py-1 border border-gray-800' {...register("price")} />
              </div>
              <div>
                <label className='text-sm block'>Description</label>
                <input type="text" className='p-2 py-1 border border-gray-800' {...register("description")} />
              </div>
              <div>
                <label className='text-sm block'>Category</label>
                <input type="text" className='p-2 py-1 border border-gray-800' {...register("category")} />
              </div>
              <div>
                <label className='text-sm block'>Image (optional)</label>
                <input type="file" className='p-2 py-1 border border-gray-800' {...register("productImage")} />
              </div>
            </div>
            <button className='bg-black text-white text-xs p-2'>
              Update Product
            </button>
          </form>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default UpdateProductModal;
