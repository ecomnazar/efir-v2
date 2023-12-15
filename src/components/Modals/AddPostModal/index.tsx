import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import Button from "../../Elements/Button";
import { addPost, showAddPostModal } from "../../../services/Posts";
import { IUser } from "../../../interfaces/IUser";
import { useParams } from "react-router-dom";
import SwitchButton from "../../Elements/SwitchButton";

const AddPostModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const isOpen = useAppSelector((state) => state.posts.modals.addPostModal);
  const [image, setImage] = React.useState<Blob | MediaSource | any>([]);
  const [isPhoto, setIsPhoto] = React.useState(true)
  const handleCloseModal = () => {
    dispatch(showAddPostModal());
  };
  const { id: idFromPath } = useParams();
  const usersAsChannel = useAppSelector(
    (state) => state.users.usersAsChannel.data
  );

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    // @ts-ignore
    const description = e.target["description"].value;
    // @ts-ignore
    const tags = e.target["tags"].value;
    // @ts-ignore
    const id = idFromPath ? idFromPath : e.target["select"].value;
    const formData = new FormData();
    formData.append("user", id);
    if(isPhoto){
      for (let index = 0; index < image.length; index++) {
        formData.append(`image_${index + 1}`, image[index]);
      }
    } else {
      formData.append("video", image[0])
    }
    // formData.append("image_1", image);
    // formData.append('image_2', image)
    // formData.append('image_3', image)
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("is_commentable", "False");
    
    await dispatch(addPost({ formData }));
    setLoading(false);
    dispatch(showAddPostModal());
  };

  const selectImage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    setImage(e.target.files);
    // @ts-ignore
  };

  const dat = Array.from(image);
  return (
    <>
      <MainModal isOpen={isOpen} handleClick={handleCloseModal}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={(e) => handleClick(e)}
        >
          <div className="flex items-start justify-between">
              <h1 className="text-darkGreyColor font-bold mb-2 text-xl">
                Add Story
              </h1>
              <div className="flex items-center gap-x-2">
                <h3 className="text-black">VIDEO</h3>
                <SwitchButton enabled={isPhoto} handleChange={() => setIsPhoto((prev) => !prev)} />
                <h3 className="text-black">PHOTO</h3>
              </div>
            </div>
          <div className="hidden">
            <input
              id="file"
              onChange={(e) => selectImage(e)}
              className=""
              type="file"
              multiple
            />
          </div>
          <div className="relative h-[400px] rounded-lg flex cursor-pointer border-2 border-darkGreyColor overflow-hidden">
            <label
              htmlFor="file"
              className="h-[400px] cursor-pointer w-full flex items-center justify-center"
            >
              {!image && (
                <h2 className="text-black font-bold tracking-[1px] text-[30px] opacity-30">
                  UPLOAD PHOTO
                </h2>
              )}
            </label>
          </div>

          {/* dat created because of directly image can not mapped */}
          {isPhoto ? dat &&
            dat.map((elem: any) => {
              return (
                <img
                  className="w-full h-full object-cover object-center"
                  src={URL.createObjectURL(elem)}
                  alt=""
                />
              );
            }) : <video src={URL.createObjectURL(image[0])} controls />}

          <input
            name="description"
            className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
            placeholder="Description"
            type="text"
          />
          <input
            name="tags"
            className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
            placeholder="Tags"
          />
          {!idFromPath && (
            <select name="select" className="bg-darkGreyColor py-2 px-3">
              {usersAsChannel?.map((elem: IUser) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.username}
                  </option>
                );
              })}
            </select>
          )}
          <Button className="!mt-0" title="add" isLoading={loading} />
        </form>
      </MainModal>
    </>
  );
};

export default AddPostModal;
