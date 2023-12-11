import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
// import { addAdmins, closeAddAdminModal } from "../../../services/AdminSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import Button from "../../Elements/Button";
import { addCategory } from "../../../services/Categories";
import {
  addChannel,
  getChannels,
  showAddChannelModal,
} from "../../../services/Channels";
import Loading from "../../Loading";
import { LuFilePlus } from "react-icons/lu";
import { addUserAsChannel, closeAddUserModal } from "../../../services/Users";

const AddUserAsChannelModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const isOpen = useAppSelector((state) => state.users.modals.addUserModal);
  const handleCloseModal = () => {
    dispatch(closeAddUserModal());
  };
  const loadingCategory = useAppSelector(
    (state) => state.categories.categories.loading
  );
  const categories = useAppSelector(
    (state) => state.categories.categories.data
  );
  const [image, setImage] = React.useState<Blob | MediaSource | any>();
  const cities = useAppSelector((state) => state.users.cities.data);
  const regions = useAppSelector((state) => state.users.regions.data);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore
    formData.append("city", e.target["city"].value);
    // @ts-ignore
    formData.append("region", e.target["region"].value);
    // @ts-ignore
    formData.append("bio", e.target["bio"].value);
    // @ts-ignore
    formData.append("address", e.target["address"].value);
    // @ts-ignore
    formData.append("avatar", image);
    formData.append("is_channel", "True");
    // @ts-ignore
    formData.append("username", e.target['username'].value);

    await dispatch(addUserAsChannel({ formData }));
    dispatch(closeAddUserModal())
    // await dispatch(getChannels())
    setLoading(false);
  };

  const selectImage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    setImage(e.target.files[0]);
  };

  return (
    <>
      <MainModal isOpen={isOpen} handleClick={handleCloseModal}>
        {loadingCategory ? (
          <Loading />
        ) : (
          <>
            <h1 className="text-darkGreyColor font-bold mb-2 text-xl">
              User as Channel
            </h1>

            <form
              className="flex flex-col gap-y-4"
              onSubmit={(e) => handleClick(e)}
            >
              <div className="hidden">
                <input
                  id="file"
                  onChange={(e) => selectImage(e)}
                  className=""
                  type="file"
                />
              </div>
              <div className="relative h-[400px] rounded-lg flex cursor-pointer border-2 border-darkGreyColor overflow-hidden">
                <label
                  htmlFor="file"
                  className="h-[400px] cursor-pointer w-full flex items-center justify-center"
                >
                  {!image && <LuFilePlus size={45} />}
                  {image && (
                    <img
                      className="w-full h-full object-cover object-center"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  )}
                </label>
              </div>
              <input
                name="username"
                className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-medium"
                placeholder="Username"
              />
              <input
                name="bio"
                className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-medium"
                placeholder="Bio"
              />
              <input
                name="address"
                className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-medium"
                placeholder="Address"
              />
             <div>
             <h1 className="text-primaryColor">Region</h1>
              <select name="region" className="bg-darkGreyColor py-2 px-3 w-full">
                {regions?.map((elem) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })}
              </select>
             </div>
             <div>
             <h1 className="text-primaryColor">City</h1>
              <select name="city" className="bg-darkGreyColor py-2 px-3 w-full">
                {cities?.map((elem) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })}
              </select>
                </div>
             
              <Button className="!mt-0" title="add" isLoading={loading} />
            </form>
          </>
        )}
      </MainModal>
    </>
  );
};

export default AddUserAsChannelModal;
