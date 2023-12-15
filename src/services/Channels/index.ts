import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, instanceSecond } from "../Api/Interceptor";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { TBoolean, TNumber } from "../../interfaces/IGlobal";
import { IChannel } from "../../interfaces/IChannel";
import toast from "react-hot-toast";

export const getChannels = createAsyncThunk('getChannels', async ({ page }: { page: TNumber }) => {
    const response = await instanceSecond(`${API_ENDPOINTS.CHANNEL}?page=${page}`)
    console.log(response.data);
    return response.data
})

export const getChannelsToPost = createAsyncThunk('getChannelsToPost', async () => {
    const response = await instance.get(`${API_ENDPOINTS.USERS}?is_channel=True`)
    console.log(response.data);
})

export const addChannel = createAsyncThunk('addCategory', async ({ formData }: any) => {
    const response = await instanceSecond.post(`${API_ENDPOINTS.CHANNEL}`, formData, {
        headers: {
            "Content-Type": 'multipart/form-data',
          }
    })
    return response.data
})

export const deleteChannel = createAsyncThunk('deleteChannel', async ({ id }: { id: TNumber }) => {
    try {
        await instanceSecond.delete(`${API_ENDPOINTS.CHANNEL}`, { data: { id} })
        toast.success('Deleted Successfully! Please Refresh;)')
    } catch (error) {
        toast.error('Not Deleted! Error: ' + error)
    }
    return id
})

export const editChannel = createAsyncThunk('editChannel', async ({ data }: any) => {
    try {
        await instanceSecond.patch(`${API_ENDPOINTS.CHANNEL}`, data, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        })
        toast.success('Deleted Successfully! Please Refresh;)')
    } catch (error) {
        toast.error('Not Deleted! Error: ' + error)
    }
})

// export const deleteCategory = createAsyncThunk('deleteCategory', async ({ id }: { id: TString }) => {
//     const data = {
//         id
//     }
//     const response = await instanceSecond.delete(`${API_ENDPOINTS.CATEGORY}`, { data })
//     console.log(response.data);
// })

interface IInitialState {
    channels: {
        data: IChannel[];
        loading: TBoolean;
        dataLength: TNumber | null;
        page: TNumber;
    };
    activeChannel: IChannel;
    modals: {
        addChannelModal: TBoolean;
        editChannelModal: TBoolean;
    }
}

const initialState: IInitialState = {
    channels: {
        data: [],
        loading: false,
        dataLength: null,
        page: 1
    },
    activeChannel: null!,
    modals: {
        addChannelModal: false,
        editChannelModal: false
    }
}

const channelSlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        showAddChannelModal(state){
            state.modals.addChannelModal = !state.modals.addChannelModal
        },
        changeChannelPage(state) {
            state.channels.page = state.channels.page + 1
        },
        openActiveChannelModal(state, action: PayloadAction<IChannel>){
            state.modals.editChannelModal = true
            state.activeChannel = action.payload
        },
        closeActiveChannelModal(state){
            state.modals.editChannelModal = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.pending, (state) => {
                state.channels.loading = true
            })
            .addCase(getChannels.fulfilled, (state, action: PayloadAction<{ results: IChannel[], count: TNumber }>) => {
                state.channels.loading = false
                state.channels.page = state.channels.page + 1
                state.channels.dataLength = action.payload.count
                state.channels.data = [...state.channels.data, ...action.payload.results]
            })
            .addCase(addChannel.pending, (state) => {
                state.channels.loading = true
            })
            .addCase(addChannel.fulfilled, (state) => {
                state.channels.loading = false
                // state.channels.data = action.payload
                state.modals.addChannelModal = false
                // state.channels.data = [...state.channels.data, action.payload]
                toast.success('Success')
            })
    }
})

export const { showAddChannelModal, changeChannelPage, openActiveChannelModal, closeActiveChannelModal } = channelSlice.actions
export default channelSlice.reducer