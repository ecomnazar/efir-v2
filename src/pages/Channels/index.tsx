import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getChannels, getChannelsToPost, openActiveChannelModal, showAddChannelModal } from "../../services/Channels";
import { IChannel } from "../../interfaces/IChannel";
import { FaPlus } from 'react-icons/fa'
import { getCategories } from "../../services/Categories";
import { TNumber } from "../../interfaces/IGlobal";
import Button from "../../components/Elements/Button";


const Channels = () => {
  const dispatch = useAppDispatch();
  const channels: IChannel[] = useAppSelector((state) => state.channels.channels.data);
  const channelsLength: TNumber | null = useAppSelector((state) => state.channels.channels.dataLength)
  const page = useAppSelector((state) => state.channels.channels.page)
  const [loading, setLoading] = React.useState(false)


  const openAddChannelModal = () => {
    dispatch(showAddChannelModal())
    dispatch(getCategories())
  }

  const changePage = async () => {
    setLoading(true)
    dispatch(getChannelsToPost())
    await dispatch(getChannels({ page }));
    // setPage(prev => prev + 1)
    setLoading(false)
  }

  // const remove = async (id: TNumber) => {
  //   await dispatch(deleteChannel({ id }))
  // }

  const handleClick = (elem: IChannel) => {
    dispatch(openActiveChannelModal(elem))
  }

  return (
    <div>
      <h1 className="text-[20px] font-medium mb-2">Channels</h1>
      {/* {channels?.length === 0 ? (
        <div className="relative h-[100vh]">
          <Loading />
        </div>
      ) : ( */}
        <div className="bg-whiteColor rounded-lg p-4">
          <li className="flex justify-around items-center py-2">
            <div className="basis-[18%] text-center text-middleGreyColor">
              Name
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Avatar
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Actions
            </div>
          </li>
          {channels?.map((elem: IChannel) => {
            return (
              <div
              onClick={() => handleClick(elem)}
                // to={`/user/${elem.id}`}
                key={elem.id}
                className="flex cursor-pointer justify-around items-center border-t-2 py-2"
              >
                <div className="basis-[18%] text-center">{elem?.name}</div>
                <div className="basis-[18%] text-center">
                  <div className="bg-primaryColor overflow-hidden h-[50px] w-[50px] mx-auto rounded-lg">
                    <img
                      src={elem?.avatar}
                      className="object-cover object-center w-full h-full"
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
            )
          })}
          {channels.length !== channelsLength && <Button isLoading={loading} className="mb-4" handleClick={changePage}>LOAD</Button>}
            <li onClick={openAddChannelModal} className="flex justify-center items-center py-4 border-2 rounded-lg cursor-pointer">
            <FaPlus color={'#AEB8C5'} />
          </li>
        </div>
      {/* )} */}
    </div>
  );
};

export default Channels
