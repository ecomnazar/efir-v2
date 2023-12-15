import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
// import { addAdmins, closeAddAdminModal } from "../../../services/AdminSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import Button from "../../Elements/Button";
import { addChannel, showAddChannelModal } from "../../../services/Channels";
import Loading from "../../Loading";
import { LuFilePlus } from 'react-icons/lu'

const AddChannelModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const isOpen = useAppSelector(
    (state) => state.channels.modals.addChannelModal
  );
  const handleCloseModal = () => {
    dispatch(showAddChannelModal());
  };
  const loadingCategory = useAppSelector((state) => state.categories.categories.loading);
  const categories = useAppSelector((state) => state.categories.categories.data)
  const [image, setImage] = React.useState<Blob | MediaSource | any>()


  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData()
    // @ts-ignore
    formData.append('name', e.target["name"].value )
    // @ts-ignore
    formData.append('category', e.target["select"].value )
    // @ts-ignore
    formData.append('avatar', image )
    
    await dispatch(addChannel({ formData }));
    // await dispatch(getChannels())
    setLoading(false);
  };

  const selectImage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {    
    // @ts-ignore
    setImage(e.target.files[0]);
  }

  return (
    <>
      <MainModal isOpen={isOpen} handleClick={handleCloseModal}>
        {loadingCategory ? (
          <Loading />
        ) : (
          <>
            <h1 className="text-darkGreyColor font-bold mb-2 text-xl">
              Channel
            </h1>
            
            <form
              className="flex flex-col gap-y-4"
              onSubmit={(e) => handleClick(e)}
            >
                <div className='hidden' >
          <input id='file' onChange={(e) => selectImage(e)} className='' type="file" />
        </div>
          <div className='relative h-[400px] rounded-lg flex cursor-pointer border-2 border-darkGreyColor overflow-hidden'>
          <label htmlFor="file" className='h-[400px] cursor-pointer w-full flex items-center justify-center'>
          {!image && <LuFilePlus size={45} />}
          {image && <img className='w-full h-full object-cover object-center' src={URL.createObjectURL(image)} alt="" /> } 
        </label>
        </div>
              <input
                name="name"
                className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-medium"
                placeholder="Name"
              />
              <select name="select" className="bg-darkGreyColor py-2 px-3">
                {categories?.map((elem) => {
                    return (
                        <option key={elem.id} value={elem.id}>{elem.name}</option>
                    )
                })}
              </select>
              <Button title="add" isLoading={loading} />
            </form>
          </>
        )}
      </MainModal>
    </>
  );
};

export default AddChannelModal;
