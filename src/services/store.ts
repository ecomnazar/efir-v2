import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './Login'
import userSlice from './Users'
import postsSlice from './Posts'
import storiesSlice from './Stories'
import adminSlice from './Admins'
import categorySlice from './Categories'
import channelSlice from './Channels'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        users: userSlice,
        posts: postsSlice,
        stories: storiesSlice,
        admins: adminSlice,
        categories: categorySlice,
        channels: channelSlice
    }
})

export default store