import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllItems,
  deleteItem,
  selectItem,
  updateItemImages,
} from '../../redux/itemSlice'; // selectItem을 추가해요
import NoticeModal from '../Modal/NoticeModal';
import UploadImge from '../Modal/UploadImage';
import UploadImgae from '../Modal/UploadImage';
import AdminSidebar from './AdminSidebar';
import ProductUpload from './ProductUpload';

const ProductManagement = ({ me }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const { list, all } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch, list, openImageModal]);
  // console.log('all ', all);

  const handleDeleteItems = () => {
    const selectedItems = all.filter((item) => item.selected);
    const itemIds = selectedItems.map((item) => item._id);
    dispatch(deleteItem({ itemId: itemIds }));
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  const toggleItemSelection = (itemId) => {
    dispatch(
      selectItem({
        itemId,
        selected: !all.find((item) => item._id === itemId).selected,
      })
    );
  };

  const openModalForImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageModal(true);
  };

  const closeModal = () => {
    setOpenImageModal(false);
  };

  return (
    <div className='w-full h-full flex flex-col pt-8 pb-16 px-10 sm:px-20 md:px-40'>
      <AdminSidebar />
      <div>
        <div className='mb-4 flex justify-between items-center'>
          <h2 className='text-xl font-semibold mb-2'>Product Management</h2>
          <button
            onClick={toggleUploadForm}
            className='bg-black text-white px-4 py-2 rounded text-[0.7rem]'
          >
            {showUploadForm ? 'Close Upload Form' : 'Upload Product'}
          </button>
        </div>

        {showUploadForm && <ProductUpload onUpload={toggleUploadForm} />}

        <div className='h-[50vh] border border-[#bbb] p-4 rounded shadow overflow-y-auto'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-lg font-semibold mb-2'>Product List</h3>
            <button
              onClick={handleDeleteItems}
              className='border border-black px-4 py-2 rounded text-[0.7rem]'
            >
              Delete Selected
            </button>
          </div>
          <table className='w-full text-left border-collapse text-[0.8rem] mt-2'>
            <thead>
              <tr className='bg-[#eee] border-b border-[#bbb]'>
                <th className='p-2 font-normal'>#</th>
                <th className='p-2 font-normal'>IMAGE</th>
                <th className='p-2 font-normal'>ITEM NAME</th>
                <th className='p-2 font-normal'>CATEGORY</th>
                <th className='p-2 font-normal'>PRICE</th>
                <th className='p-2 font-normal'></th>
              </tr>
            </thead>
            {all
              .filter((item) =>
                item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <tbody key={product._id}>
                  <tr className='border-t border-[#bbb]'>
                    <td className='p-2'>
                      <input
                        type='checkbox'
                        checked={product.selected}
                        onChange={() => toggleItemSelection(product._id)}
                        className='mr-2'
                      />
                    </td>
                    <td className='p-2'>
                      <img
                        src={product.item_img}
                        alt={product.item_name}
                        className='w-[3rem] h-[3rem]'
                      />
                    </td>
                    <td className='p-2'>{product.item_name}</td>
                    <td className='p-2'>{product.category?.name}</td>
                    <td className='p-2'>${product.item_price}</td>
                    <td className='p-2 flex gap-2 w-full'>
                      <button
                        className={`w-full bg-[#ddd] rounded-lg 
                      py-1 px-2 text-[0.7rem] ${
                        !product.item_img
                          ? 'bg-black text-white'
                          : 'cursor-not-allowed text-[#888]'
                      }`}
                        onClick={() => openModalForImageUpload(product)}
                        disabled={!!product.item_img}
                      >
                        Upload Image
                      </button>

                      <button className=' w-full border border-[#bbb] rounded-lg py-1 px-1 text-[0.7rem]'>
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          {openImageModal && (
            <NoticeModal closeModal={closeModal}>
              <UploadImge
                closeModal={() => setOpenImageModal(false)}
                selectedProduct={selectedProduct}
                me={me}
              />
            </NoticeModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
