import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceSecond } from "../Api/Interceptor";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { TBoolean, TString } from "../../interfaces/IGlobal";
import { IAddPost, IPost } from "../../interfaces/IPost";
import toast from "react-hot-toast";

export const getPosts = createAsyncThunk('getPosts', async () => {
    const response = await instanceSecond.get(`${API_ENDPOINTS.POSTS}`)
    return response.data
})

export const addPost = createAsyncThunk('addPost', async ({ formData }: any) => {
    try {
        const response = await instanceSecond.post(`${API_ENDPOINTS.POSTS}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
              }
        })
        toast.success('Added Successfully! Refresh Please;)')
        return response.data
    } catch (error) {
        toast.error('Unknown error')
    }
})

export const getUserPosts = createAsyncThunk('userPosts', async (id: TString) => {
    const response = await instanceSecond.get(`${API_ENDPOINTS.POSTS}?user=${id}`)
    return response.data
})

export const getPost = createAsyncThunk('getPost', async (id: TString) => {
    const response = await instanceSecond.get(`${API_ENDPOINTS.POSTS}?post_id=${id}`)
    console.log(response.data);
    
    return response.data
})

export const updatePost = createAsyncThunk('updatePost', async ({ data }: { data: IAddPost }) => {
    try {
        const response = await instanceSecond.patch(`${API_ENDPOINTS.POSTS}`, data, {
            headers: {
                "Content-Type": 'multipart/form-data',
                // image field null error need to fix
              }
        })
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
    
})

export const deletePost = createAsyncThunk('deletePost', async (id: TString) => {
    try {
        await instanceSecond.delete(`${API_ENDPOINTS.POSTS}`, { data: {id: id} })
        toast.success('Deleted Successfully')
        return id 
    } catch (error) {
        toast.error('Unknown Error')
    }
})

interface IInitialState {
    posts: {
        data: IPost[],
        loading: TBoolean
    };
    userPosts: {
        data: IPost[],
        loading: TBoolean
    };
    post: {
        data: IPost;
        loading: TBoolean;
    }
    modals: {
        getPostModal: TBoolean;
        addPostModal: TBoolean;
    }
}

const initialState: IInitialState = {
    posts: {
        data: [],
        loading: false
    },
    userPosts: {
        data: [],
        loading: false
    },
    post: {
        data: null!,
        loading: false
    },
    modals: {
        getPostModal: false,
        addPostModal: false
    }
}

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        showGetPostModal(state){
            state.modals.getPostModal = !state.modals.getPostModal
        },
        showAddPostModal(state){
            state.modals.addPostModal = !state.modals.addPostModal
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.posts.loading = true
            })
            .addCase(getPosts.fulfilled, (state, action: PayloadAction<{ results: IPost[] }>) => {
                state.posts.loading = false
                state.posts.data = action.payload.results
            })
            .addCase(getUserPosts.pending, (state) => {
                state.userPosts.loading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action: PayloadAction<{ results: IPost[] }>) => {
                state.userPosts.loading = false
                state.userPosts.data = action.payload.results
            })
            .addCase(getPost.pending, (state) => {
                state.post.loading = true
            })
            .addCase(getPost.fulfilled, (state, action: PayloadAction<IPost>) => {
                state.post.loading = false
                state.post.data = action.payload
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const filteredData = state.posts.data.filter((elem) => elem.id !== action.payload)
                state.posts.data = filteredData
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.data.unshift(action.payload)
            })
    }
})

export const { showGetPostModal, showAddPostModal } = postsSlice.actions
export default postsSlice.reducer