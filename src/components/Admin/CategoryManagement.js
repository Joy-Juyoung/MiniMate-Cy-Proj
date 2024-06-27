import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../redux/categorySlice";
import Buttons from "../Buttons";
import AdminSidebar from "./AdminSidebar";

const CategoryManagement = ({ me }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryKind, setNewCategoryKind] = useState("");
  const [newKind, setNewKind] = useState("");
  const [newName, setNewName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [duplicateError, setDuplicateError] = useState(false);
  const [showAddFields, setShowAddFields] = useState(false);
  const [searchKind, setSearchKind] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleUpdate = (categoryId, newName, newKind) => {
    if (!newName || newName.trim() === "" || !newKind || newKind.trim() === "")
      return;
    dispatch(
      updateCategory({
        categoryId,
        categoryData: { name: newName, kind: newKind },
      })
    );
    setNewName("");
    setSelectedCategoryId(null);
  };

  const handleCreate = () => {
    if (newCategoryName.trim() === "" || newCategoryKind.trim() === "") return;
    if (isDuplicateCategory(newCategoryName)) {
      setDuplicateError(true);
      return;
    }
    dispatch(
      createCategory({
        categoryData: { name: newCategoryName, kind: newCategoryKind },
      })
    );
    setNewCategoryName("");
    setNewCategoryKind("");
    setDuplicateError(false);
    setShowAddFields(false);
  };

  const handleInputChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleKindChange = (e) => {
    setNewCategoryKind(e.target.value);
  };

  const handleEditClick = (categoryId, categoryName, categoryKind) => {
    setSelectedCategoryId(categoryId);
    setNewName(categoryName);
    setNewKind(categoryKind);
  };

  const isDuplicateCategory = (name) => {
    return categories.some((category) => category.name === name);
  };

  const filteredCategories = categories.filter((category) =>
    category.kind.toLowerCase().includes(searchKind.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-16 sm:px-20 md:px-40">
      <AdminSidebar />
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="mr-4 text-xl font-semibold w-fit">
              Category Management
            </h2>
            {/* <input
              type="text"
              placeholder="Search by Kind"
              value={searchKind}
              onChange={(e) => setSearchKind(e.target.value)}
              className="px-2 py-1 w-1/2 border border-[#bbb] rounded-lg"
            /> */}
          </div>
          <button
            onClick={() => setShowAddFields(!showAddFields)}
            className={`px-4 py-2 rounded-lg text-[0.7rem]
                ${
                  showAddFields
                    ? "bg-[#ddd] text-black"
                    : "bg-black text-white "
                }`}
          >
            {showAddFields ? "Close Add Form" : " Add Category"}
          </button>
        </div>

        {showAddFields && (
          <div className="px-6 py-4 mb-4 border border-[#bbb] rounded-lg-md">
            <h2 className="text-[1rem] font-semibold mb-4">Add Category</h2>

            <div className="text-[0.8rem] ">
              <div className="mb-4 ">
                <label className="block mb-1 font-semibold">
                  <span>Category Kind:</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter new category kind"
                  value={newCategoryKind}
                  onChange={handleKindChange}
                  className="w-64 px-2 py-2 mt-1 border border-[#bbb] rounded-lg"
                />
              </div>{" "}
              <div className="mb-4 ">
                <label className="block mb-1 font-semibold">
                  <span>Category Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter new category name"
                  value={newCategoryName}
                  onChange={handleInputChange}
                  className="w-64 px-2 py-2 mt-1 border border-[#bbb] rounded-lg"
                />
              </div>
            </div>
            {/* <div className="flex justify-end w-full "> */}
            <button
              onClick={handleCreate}
              className="px-4 py-2 text-white bg-black rounded-lg text-[0.7rem] "
            >
              Add Category
            </button>
            {/* </div> */}
            {/* <button
              onClick={handleCreate}
              className="bg-black text-white px-4 py-2 rounded-lg text-[0.7rem]"
            >
              Add
            </button> */}
          </div>
        )}
        {duplicateError && (
          <p className="text-[#c82828] mt-2">Category already exists!</p>
        )}
        {error && <p className="text-[#fefefe] mt-2">{error}</p>}

        <div
          className={`overflow-y-auto bg-white shadow-md mt-4 ${
            showAddFields ? "h-[45vh]  mb-16" : "h-[55vh]"
          }`}
        >
          <table className="relative w-full text-left border-collapse text-[0.8rem] table-fixed">
            <thead className="sticky top-0 h-[50px]">
              <tr className="bg-[#eee] border-b border-[#bbb] rounded-lg text-[#343434]">
                <th className="p-2 pl-4 md:pl-8 w-[25%]">ID</th>
                <th className="p-2 w-[25%]">Kind</th>
                <th className="p-2 w-[25%]">Name</th>
                <th className="p-2 pr-8 w-[25%] flex justify-end "></th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category._id}
                  className={`border-t border-[#bbb] ${
                    selectedCategoryId === category._id ? "bg-[#fff7dc]" : ""
                  }`}
                >
                  <td className="p-2 pl-4 md:pl-8">{category._id}</td>
                  {/* <td className="p-2 pl-4 md:pl-8">{category._id.slice(-5)}</td> */}
                  <td className="p-2">
                    {selectedCategoryId === category._id ? (
                      <input
                        type="text"
                        value={newKind}
                        onChange={(e) => setNewKind(e.target.value)}
                        className="border border-[#bbb] p-1 rounded-lg w-full"
                      />
                    ) : (
                      category.kind
                    )}
                  </td>
                  <td className="p-2">
                    {selectedCategoryId === category._id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border border-[#bbb] p-1 rounded-lg w-full"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="p-2 pr-8">
                    {selectedCategoryId === category._id ? (
                      <button
                        onClick={() =>
                          handleUpdate(category._id, newName, newKind)
                        }
                        className="w-full bg-black text-white rounded-lg py-2 px-2 text-[0.7rem]"
                      >
                        Confirm
                      </button>
                    ) : (
                      <div className="flex justify-end gap-2 ">
                        <button
                          onClick={() =>
                            handleEditClick(
                              category._id,
                              category.name,
                              category.kind
                            )
                          }
                          className="border px-4 py-2 rounded-lg text-[0.7rem]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="bg-[#ddd]  px-4 py-2 rounded-lg text-[0.7rem]"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
