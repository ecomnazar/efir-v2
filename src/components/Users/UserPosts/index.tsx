import React from "react";
import PostsGrid from "../../PostsGrid";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { TString } from "../../../interfaces/IGlobal";
import { getUserPosts } from "../../../services/Posts";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IPost } from "../../../interfaces/IPost";

interface IUserPosts {
  id: TString;
}

const UserPosts = ({ id }: IUserPosts) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.userPosts.data);
  React.useEffect(() => {
    if (id) {
      dispatch(getUserPosts(id));
    }
  }, [id]);

  return (
    <div className="">
      <div className="grid grid-cols-8 gap-4">
        {posts?.map((elem: IPost) => {
          return <PostsGrid key={elem.id} post={elem} />;
        })}
      </div>
      {/* if user not have post */}
      {posts.length === 0 && <div className="">
          <h1 className="text-[40px] font-bold text-middleGreyColor absolute top-1/2 left-1/2">DON'T HAVE A POST :(</h1>
        </div>}
    </div>
  );
};

export default UserPosts;
