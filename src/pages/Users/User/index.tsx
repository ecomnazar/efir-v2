import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { deletePremiumUser, getUser, postPremiumUser } from "../../../services/Users";
import { useAppSelector } from "../../../hooks/useAppSelector";
import UserPosts from "../../../components/Users/UserPosts";
import Loading from "../../../components/Loading";
import dateformat from "dateformat";
import SwitchButton from "../../../components/Elements/SwitchButton";
import { showAddPostModal } from "../../../services/Posts";


const User = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const user = useAppSelector((state) => state.users.user.data);
  const loadingUser = useAppSelector((state) => state.users.user.loading)
  const loadingPosts = useAppSelector((state) => state.posts.userPosts.loading)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [id]);

  const setPremium = async () => {    
    const period = inputRef.current?.value
    if(user.is_premium) {
      await dispatch(deletePremiumUser(user.id))
    } else {
      await dispatch(postPremiumUser({
        id: user.id,
        period: Number(period)
      }))
    }
    dispatch(getUser(id!))
  }

  const addPost = () => {
    dispatch(showAddPostModal())
  }

  return (
    <div>
     {loadingPosts && loadingUser ? <div className="relative h-[100vh]"><Loading /></div> : <>
      <div className="flex items-start gap-x-4">
        <img className="w-[200px] h-[200px] rounded-lg object-cover object-center" src={user?.avatar} alt="" />
        <div>
          <div className="flex items-center gap-x-2">
            <button className="bg-primaryColor text-whiteColor px-4 py-2 rounded-md text-sm" onClick={addPost}>add post</button>
            {/* <button className="bg-green-300 text-whiteColor px-4 py-2 rounded-md text-sm" onClick={addPost}>add video</button> */}
          </div>
          <h1 className="text-[34px] font-bold">{user?.username}</h1>
          <h2>Number: {user?.phone_number}</h2>
          <h3>City: {user?.city.name}</h3>
          <div className="flex items-center gap-x-2">
            <h4>Premium:</h4> <SwitchButton enabled={user?.is_premium} handleChange={setPremium} />
            <input ref={inputRef} type="number" defaultValue={1} />
          </div>
          {/* <div className="flex items-center gap-x-2">
            <h4>Commentable:</h4> <SwitchButton enabled={user?.is_commentable} handleChange={setPremium} />
          </div> */}
          {user?.premium_at && <h5>Premium at:  {dateformat(user.premium_at, "mmmm dd yyyy") + ': ' + dateformat(user?.expires_at!, "mmmm dd yyyy")}</h5>}
          <p>Bio: {user?.bio}</p>
        </div>
      </div>
   
      <div className="border-t-2 border-darkGreyColor my-4"></div>
      <UserPosts id={id ? id : ''} />
     </>}
    </div>
  );
};

export default User;
