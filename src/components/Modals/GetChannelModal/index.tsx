import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import Button from "../../Elements/Button";
import {
  closeActiveChannelModal,
  deleteChannel,
  editChannel,
} from "../../../services/Channels";
import { IChannel } from "../../../interfaces/IChannel";

const GetChannelModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [image, setImage] = React.useState()
  const isOpen = useAppSelector((state) => state.channels.modals.editChannelModal);
  const textRef = React.useRef(null);
  const channelData = useAppSelector((state) => state.channels.activeChannel);

  const handleCloseModal = () => {
    dispatch(closeActiveChannelModal());
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteChannel({ id: channelData.id }));
    dispatch(closeActiveChannelModal());
    setLoading(false);
  };

  const handleSubmit = async () => {
    //@ts-ignore
    const text = textRef.current.value;
    setLoadingButton(true);
    
    const data = new FormData()
    data.append('id', `${channelData.id}`)
    data.append('name', text)
    image && data.append('avatar', image)
    
    await dispatch(editChannel({ data }))
    dispatch(closeActiveChannelModal())
    setLoadingButton(false);
  };

  const imageInputRef = React.useRef(null)

  const handleChangeImage = (e: any) => {
    setImage(e.target.files[0])
  }

  return (
    <>
      <MainModal
        minHeight="!min-h-[400px]"
        isOpen={isOpen}
        handleClick={handleCloseModal}
      >
        <>
          {channelData && (
            <input
              className="text-black outline-none text-[34px] w-full font-medium cursor-default"
              type="text"
              ref={textRef}
              defaultValue={channelData.name}
            />
          )}
          <img
          //@ts-ignore
          onClick={() => imageInputRef.current.click()}
            className="w-full aspect-square object-cover object-center mt-4 mx-auto"
            src={channelData?.avatar ? channelData?.avatar : ""}
            alt=""
          />
          <input type="file" onChange={handleChangeImage} ref={imageInputRef} className="absolute top-0 -left-1/2" />

          <Button isLoading={loadingButton} handleClick={handleSubmit}>
            Edit
          </Button>
          <Button
            isLoading={loading}
            handleClick={handleDelete}
            className="bg-red-500 !mt-1"
          >
            Delete
          </Button>
          {/* <button
                onClick={handleDelete}
                className="bg-red-500 w-full text-center h-[40px] px-[20px] flex items-center rounded-md relative"
              >
                {loading ? <Loading color="white" width="24" /> : "Delete"}
              </button> */}
        </>
      </MainModal>
    </>
  );
};

export default GetChannelModal;
