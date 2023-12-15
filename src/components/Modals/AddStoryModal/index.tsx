import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import Button from "../../Elements/Button";
import Loading from "../../Loading";
import { addStory, showAddStoryModal } from "../../../services/Stories";
import SwitchButton from "../../Elements/SwitchButton";

const AddStoryModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [isPhoto, setIsPhoto] = React.useState(true)
  const isOpen = useAppSelector((state) => state.stories.modals.addStoryModal);
  const handleCloseModal = () => {dispatch(showAddStoryModal());};
  const loadingChannel = useAppSelector((state) => state.channels.channels.loading);
  const channels = useAppSelector((state) => state.channels.channels.data);
  const [image, setImage] = React.useState<Blob | MediaSource | any>();
  const linkInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append(isPhoto ? "image" : "video", image)
    // @ts-ignore
    formData.append("channel", e.target["select"].value);
    formData.append("type", isPhoto ? "image" : "video");
    formData.append("link", linkInputRef.current?.value!);
    await dispatch(addStory({ formData }));
    console.log(isPhoto);
    
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
        {loadingChannel ? (
          <Loading />
        ) : (
          <>
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
                  accept="image/*, video/*"
                />
              </div>
              <div className="relative h-[400px] rounded-lg flex cursor-pointer border-2 border-darkGreyColor overflow-hidden">
                <label
                  htmlFor="file"
                  className="h-[400px] cursor-pointer w-full flex items-center justify-center"
                >
                  {!image && (
                    <h1 className="text-middleGreyColor text-[55px] tracking-[10px] font-bold">
                      SELECT
                    </h1>
                  )}
                  {image && (
                    <video
                      className="w-full h-full object-cover object-center"
                      src={URL.createObjectURL(image)}
                      // alt=""
                      controls
                    />
                  )}
                </label>
              </div>
              <select name="select" className="bg-darkGreyColor py-2 px-3">
                {channels?.map((elem) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })}
              </select>
              <input
                ref={linkInputRef}
                className="border-2 border-primaryColor w-full h-[50px] outline-none rounded-lg px-3 text-darkGreyColor font-bold"
                placeholder="Link: https://example.com"
              />
              <Button className="!mt-0" title="add" isLoading={loading} />
            </form>
          </>
        )}
      </MainModal>
    </>
  );
};

export default AddStoryModal;
