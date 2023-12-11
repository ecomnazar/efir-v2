import clsx from "clsx";
import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCities, getRegions, getUsers, openAddUserModal } from "../../services/Users";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../components/Loading";
import { IUser } from "../../interfaces/IUser";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Users = () => {
  const dispatch = useAppDispatch();
  const users: IUser[] = useAppSelector((state) => state.users.users.data);

  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getRegions())
    dispatch(getCities())
  }, []);


  return (
    <div>
      <h1 className="text-[20px] font-medium mb-2">Users</h1>
      {users.length === 0 ? (
        <div className="relative h-[100vh] pb-[100px]">
          <Loading />
        </div>
      ) : (
        <div className="bg-whiteColor rounded-lg p-4">
          <li
            onClick={() => dispatch(openAddUserModal())}
            className="flex justify-center items-center py-4 border-2 rounded-lg cursor-pointer"
          >
            <FaPlus color={"#AEB8C5"} />
          </li>
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
              Premium
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Avatar
            </div>
          </li>
          {users.map((elem: IUser) => {
            return (
              <Link
                to={`/user/${elem.id}`}
                key={elem.id}
                className="flex cursor-pointer justify-around items-center border-t-2 py-2"
              >
                <div className="basis-[18%] text-center">{elem?.username}</div>
                <div className="basis-[18%] text-center">
                  {elem?.region.name}
                </div>
                <div className="basis-[18%] text-center">
                  {elem?.phone_number ? elem?.phone_number : <div className="bg-primaryColor w-fit mx-auto px-4 py-2 rounded-md text-whiteColor">Channel</div>}
                </div>
                <div className="basis-[18%] text-center">
                  <div
                    className={clsx("h-[30px] w-[30px] mx-auto rounded-full", {
                      ["bg-red-600"]: !elem?.is_premium,
                      ["bg-green-300"]: elem?.is_premium,
                    })}
                  ></div>
                </div>
                <div className="basis-[18%] text-center">
                  <div className="bg-primaryColor overflow-hidden h-[50px] w-[50px] mx-auto rounded-lg">
                    {elem.avatar && (
                      <img
                        src={elem?.avatar}
                        className="object-cover object-center w-full h-full"
                        alt="avatar"
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
          {/* <li onClick={() => dispatch(openAddUserModal())} className="flex justify-center items-center py-4 border-2 rounded-lg cursor-pointer">
            <FaPlus color={'#AEB8C5'} />
          </li> */}
        </div>
      )}
    </div>
  );
};

export default Users;
