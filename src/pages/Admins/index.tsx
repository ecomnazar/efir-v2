import clsx from "clsx";
import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../components/Loading";
import { IAdmin } from "../../interfaces/IAdmin";
import { deleteAdmin, getAdmins, showAddAdminModal } from "../../services/Admins";
import { FaPlus } from 'react-icons/fa'
import SwitchButton from "../../components/Elements/SwitchButton";
import { getUsersAsChannel } from "../../services/Users";
import { TString } from "../../interfaces/IGlobal";

const Admins = () => {
  const dispatch = useAppDispatch();
  const admins: IAdmin[] = useAppSelector((state) => state.admins.admins.data);

  React.useEffect(() => {
    dispatch(getAdmins());
    dispatch(getUsersAsChannel())
  }, []);

  const openAddAdminModal = () => dispatch(showAddAdminModal())

  const handleAdminClick = async (id: TString) => {
    await dispatch(deleteAdmin({ id }))
    dispatch(getAdmins())
  }

  return (
    <div>
      <h1 className="text-[20px] font-medium mb-2">Users</h1>
      {admins?.length === 0 ? (
        <div className="relative h-[100vh]">
          <Loading />
        </div>
      ) : (
        <div className="bg-whiteColor rounded-lg p-4">
          <li className="flex justify-around items-center py-2">
            <div className="basis-[18%] text-center text-middleGreyColor">
              Author
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Place
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Number
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Superuser
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Gender
            </div>
          </li>
          {admins?.map((elem: IAdmin) => {
            return (
              <div
                onClick={() => handleAdminClick(elem.id)}
                key={elem?.id}
                className="flex cursor-pointer justify-around items-center border-t-2 py-2"
              >
                <div className="basis-[18%] text-center">{elem?.username}</div>
                <div className="basis-[18%] text-center">
                  {elem?.region}
                </div>
                <div className="basis-[18%] text-center">
                  {elem?.phone_number}
                </div>
                <div className="basis-[18%] text-center">
                  {/* <div
                    className={clsx("h-[30px] w-[30px] mb-2 mx-auto rounded-full", {
                      ["bg-red-600"]: !elem?.is_superuser,
                      ["bg-green-300"]: elem?.is_superuser,
                    })}
                  ></div> */}
                  <SwitchButton enabled={elem.is_superuser} handleChange={() => {}} />
                </div>
                <div className="basis-[18%] text-center">
                  <div className={clsx("bg-primaryColor overflow-hidden h-[50px] w-[50px] mx-auto rounded-lg", {
                    ["bg-blue-600"]: elem?.gender === 'male',
                    ["bg-pink-300"]: elem?.gender === 'female',
                  })}>
                  <div
                    className="h-[30px] w-[30px] mx-auto rounded-full"
                  ></div>
                  </div>
                </div>
              </div>
            );
          })}
          <li onClick={openAddAdminModal} className="flex justify-center items-center py-4 border-2 rounded-lg cursor-pointer">
            <FaPlus color={'#AEB8C5'} />
          </li>
        </div>
      )}
    </div>
  );
};

export default Admins;
