import React, { useState } from 'react';
import ProductDataTable from './ProductDataTable';
import ProductFormModal from './ProductFormModal';
import UpdateProductModal from './UpdateProductModal';
import { FaEdit } from "react-icons/fa";

const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleAddClick = () => {
    setIsUpdate(false);
    setRowData({});
    setOpen(true);
  };

  const handleUpdateClick = (data) => {
    setIsUpdate(true);
    setRowData(data);
    setOpen(true);
  };

  return (
    <div className="">
      <div className="flex justify-between p-4 m-4">
        <div>
          <p className="text-2xl font-semibold">Products</p>
        </div>
        <div>
          <button
            className="p-2 border-2 border-gray-800 text-xs font-medium active:bg-black active:text-white"
            onClick={handleAddClick}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="m-4 p-4">
        <ProductDataTable handleUpdateClick={handleUpdateClick} />
      </div>
      {/* Conditionally render modals based on isUpdate */}
      {isUpdate ? (
        <UpdateProductModal open={open} setOpen={setOpen} product={rowData} />
      ) : (
        <ProductFormModal open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default AdminProduct;
