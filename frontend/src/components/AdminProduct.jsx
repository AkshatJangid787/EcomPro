import React, { useState } from 'react'
import ProductFormModel from './ProductFormModel'
import ProductDataTable from './ProductDataTable';


const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className='flex justify-end p-4 m-4'>
        <div>
          <button className='p-2 border-2 border-gray-800 text-xs font-medium active:bg-black active:text-white' onClick={()=>{setOpen(true)}} >Add Product</button>
        </div>
      </div>
      <ProductFormModel open={open}  setOpen={setOpen} />
      <ProductDataTable/>
    </div>
  )
}

export default AdminProduct