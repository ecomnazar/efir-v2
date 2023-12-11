import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import MainModal from "../MainModal";
import {
  deletePost,
  showGetPostModal,
  updatePost,
} from "../../../services/Posts";
import Loading from "../../Loading";
import dateFormat from "dateformat";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Button from "../../Elements/Button";
import { IAddPost } from "../../../interfaces/IPost";
import { useForm } from "react-hook-form";

const GetPostModal = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const isOpen = useAppSelector((state) => state.posts.modals.getPostModal);
  const post = useAppSelector((state) => state.posts.post.data);
  const loadingPost = useAppSelector((state) => state.posts.post.loading);
  const textRef = React.useRef(null)
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch(showGetPostModal());
  };

  const goToProfile = () => {
    handleCloseModal();
    navigate(`/user/${post?.user?.id}`);
  };

  const handleDelete = async () => {
    setLoading(true);

    await dispatch(deletePost(post.id));
    dispatch(showGetPostModal());
    setLoading(false);
  };

  const handleSubmit = async () => {
    //@ts-ignore
    const text = textRef.current.value
    setLoadingButton(true);

    const data: IAddPost = {
      id: post.id,
      description: text,
      // image_1: post.images[0],
      is_commentable: "False",
      tags: post.tags,
      user: post.user.id,
    };
    await dispatch(updatePost({ data }));
    setLoadingButton(false);
  };

  return (
    <>
      <MainModal
        minHeight="!min-h-[400px]"
        isOpen={isOpen}
        handleClick={handleCloseModal}
      >
        {loadingPost ? (
          <Loading />
        ) : (
          <>
            <button onClick={goToProfile} className="bg-primaryColor h-[50px] flex items-center justify-center rounded-md w-full mb-2">Go to profile</button>
            {post && (
              <input
                className="text-black outline-none text-[34px] w-full font-medium cursor-default"
                type="text"
                ref={textRef}
                defaultValue={post?.description ? post?.description : 'No title'}
              />
            )}
            <div className="flex items-center gap-x-2"></div>

            {post?.images?.map((elem) => {
              return (
                <img
                  className="w-full aspect-square object-cover object-center mt-4 mx-auto"
                  src={elem}
                  alt=""
            />
              )
            })}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm mt-2 text-darkGreyColor">
                  {post?.tags}
                </h4>
                <h5 className="text-darkGreyColor">
                  {dateFormat(post?.created_at, "mmmm dd yyyy")}
                </h5>
              </div>
              <div className="flex items-center gap-x-2">
                <FcLike size={24} />
                <p className="text-xl text-darkGreyColor">{post?.likes}</p>
              </div>
            </div>
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
        )}
      </MainModal>
    </>
  );
};

export default GetPostModal;
