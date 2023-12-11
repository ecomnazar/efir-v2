import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
// import { addAdmins, closeAddAdminModal } from "../../../services/AdminSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import { addAdmin, showAddAdminModal } from "../../../services/Admins";
import Button from "../../Elements/Button";
import { addCategory, showAddCategoryModal } from "../../../services/Categories";

const AddCategoryModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false)
  const isOpen = useAppSelector((state) => state.categories.modals.addCategoryModal);
  const handleCloseModal = () => {
    dispatch(showAddCategoryModal())
  }

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    // @ts-ignore
    const name = e.target["name"].value;
    await dispatch(addCategory({ name }));
    console.log('clicked');
    
    setLoading(false)
  };

  return (
    <>
        <MainModal isOpen={isOpen} handleClick={handleCloseModal}>
          <form className="flex flex-col gap-y-4" onSubmit={(e) => handleClick(e)}>
            <input
              name="name"
              className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-medium"
              placeholder="Category Name"
            />
            <Button className="!mt-0" title="add" isLoading={loading} />
          </form>
        </MainModal>
    </>
  );
};

export default AddCategoryModal
