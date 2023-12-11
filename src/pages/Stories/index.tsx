import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addStory,
  getStories,
  showAddStoryModal,
} from "../../services/Stories";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/useAppSelector";
import { LuFilePlus } from "react-icons/lu";
import { getChannels } from "../../services/Channels";
import dateFormat from 'dateformat'
import clsx from "clsx";

const Stories = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = React.useState<Blob | MediaSource | any>();
  const { handleSubmit } = useForm();
  const stories = useAppSelector((state) => state.stories.stories.data);
  const channelPage = useAppSelector((state) => state.channels.channels.page);
  const channelsLength = useAppSelector(
    (state) => state.channels.channels.dataLength
  );
  const channels = useAppSelector((state) => state.channels.channels.data);

  React.useEffect(() => {
    dispatch(getStories());
  }, []);

  const submit = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("channel", "10");
    formData.append("type", "image");
    dispatch(addStory({ formData }));
  };

  const openAddStoryModal = () => {
    dispatch(showAddStoryModal());
    if (channels.length !== channelsLength) {
      dispatch(getChannels({ page: channelPage }));
    }
    // dispatch(getChannels())
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit(submit)}>
        <input onChange={(e) => selectImage(e)} type="file" />
        <button className='bg-primaryColor'>SUBMIT</button>
      </form> */}

      <div className="grid grid-cols-5 gap-4">
        <div
          onClick={openAddStoryModal}
          className="relative h-[400px] rounded-lg flex cursor-pointer border-2 border-darkGreyColor items-center justify-center"
        >
          <h2 className="text-black font-bold tracking-[1px] text-[25px] opacity-30">
            UPLOAD
          </h2>
        </div>
        {stories?.map((elem) => {
          return (
            // <div className='h-[400px] border-2 border-darkGreyColor rounded-lg' key={elem.id}>
            //   <img loading='lazy' className='w-full h-full object-cover object-center' src={elem.image} alt="" />
            // </div>
            <div className="h-[460px]">
                {elem.type === "video" ? (
                  <div
                    className="h-[400px] border-2 border-darkGreyColor rounded-lg"
                    key={elem.id}
                  >
                    {elem?.video && (
                      <video
                        controls
                        className="w-full h-full object-cover object-center"
                        src={elem.video}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    className="h-[400px] border-2 border-darkGreyColor rounded-lg"
                    key={elem.id}
                  >
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                      src={elem.image}
                      alt=""
                    />
                  </div>
                )}
                <div className="h-[50px] mt-[10px] rounded-lg flex items-center justify-between">
                  <a target="_blank" className={clsx(`bg-primaryColor text-whiteColor px-4 py-1.5 cursor-pointer text-[15px] rounded-lg`, {
                    ['pointer-events-none']: !elem.link,
                    ['pointer-events-auto']: elem.link,
                  })} href={elem?.link!}>{elem.link ? 'Open Link' : 'No Link'}</a>
                  <p>{dateFormat(elem.created_at, "mmmm dd")}</p>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
