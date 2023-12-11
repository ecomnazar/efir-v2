import React from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getPosts } from '../../services/Posts'
import { useAppSelector } from '../../hooks/useAppSelector'
import { IPost } from '../../interfaces/IPost'
import PostsGrid from '../../components/PostsGrid'
import { getUsersAsChannel } from '../../services/Users'

const Posts = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.posts.posts.data)

  React.useEffect(() => {
    dispatch(getPosts())
    dispatch(getUsersAsChannel())
  }, [])

  return (
    <div>
      <h1 className="text-[20px] font-medium mb-2">Posts</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {posts?.map((elem: IPost) => {
          return <PostsGrid key={elem.id} post={elem} />;
        })}
      </div>
    </div>
  )
}

export default Posts