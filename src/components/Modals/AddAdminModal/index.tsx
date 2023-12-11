import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
// import { addAdmins, closeAddAdminModal } from "../../../services/AdminSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import { addAdmin, showAddAdminModal } from "../../../services/Admins";
import Button from "../../Elements/Button";

const AddAdminModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false)
  const isOpen = useAppSelector((state) => state.admins.modals.addAdminModal);
  const handleCloseModal = () => {
    dispatch(showAddAdminModal())
  }

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    // @ts-ignore
    const username = e.target["username"].value;
    // @ts-ignore
    const password = e.target["password"].value;
    // @ts-ignore
    const region = e.target["region"].value;
    // @ts-ignore
    const phone_number = e.target["phoneNumber"].value;
    // @ts-ignore
    const gender = e.target["gender"].value;
    await dispatch(addAdmin({ username, password, region, phone_number, gender }));
    setLoading(false)
  };

  return (
    <>
        <MainModal isOpen={isOpen} handleClick={handleCloseModal}>
          <form className="flex flex-col gap-y-4" onSubmit={(e) => handleClick(e)}>
            <input
              name="username"
              className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
              placeholder="Username"
            />
            <input
              name="password"
              className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
              placeholder="Password"
              type="password"
            />
            <input
              name="region"
              className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
              placeholder="Region"
            />
            <input
              name="phoneNumber"
              className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
              placeholder="Phone number"
            />
            <input
              name="gender"
              className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
              placeholder="Male/Female"
            />
            <Button title="add" isLoading={loading} />
          </form>
        </MainModal>
    </>
  );
};

export default AddAdminModal;
