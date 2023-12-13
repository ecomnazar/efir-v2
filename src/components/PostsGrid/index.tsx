import { useAppDispatch } from "../../hooks/useAppDispatch";
import { IPost } from "../../interfaces/IPost";
import { AiFillHeart } from "react-icons/ai";
import { getPost, showGetPostModal } from "../../services/Posts";
import dateformat from "dateformat";

interface IPostsGrid {
  post: IPost;
}

const PostsGrid = ({ post }: IPostsGrid) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getPost(post.id));
    dispatch(showGetPostModal());
  };

  return (
    <div
      onClick={handleClick}
      className="h-[165px] rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="relative h-full overflow-hidden">
        {post.type === 'video' ? <video className="object-cover object-center w-full h-full"
          src={post?.video} controls /> : <img
          className="object-cover object-center w-full h-full"
          src={post?.images[0]}
          alt="post"
        />}

        <div className="w-full px-2 h-[30px] bg-primaryColor text-whiteColor absolute bottom-0 left-0 flex items-center justify-between">
          <h1 className="text-[11px]">
            {dateformat(post?.created_at, "mmmm dd")}
          </h1>
          <div className="flex items-center gap-x-1">
            <AiFillHeart size={18} className="inline-block text-red-500" />
            <p>{post?.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsGrid;
