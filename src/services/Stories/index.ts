import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceSecond } from "../Api/Interceptor";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { IStory } from "../../interfaces/IStory";
import { TBoolean } from "../../interfaces/IGlobal";

export const getStories = createAsyncThunk('getStories', async () => {
    const response = await instanceSecond.get(`${API_ENDPOINTS.STORIES}`)
    return response.data
})

export const addStory = createAsyncThunk('addStory', async ({ formData }: any) => {
    const response = await instanceSecond.post(`${API_ENDPOINTS.STORIES}`, formData, {
        headers: {
            "Content-Type": 'multipart/form-data',
          }
    })
    return response.data
})

interface IInitialState {
    stories: {
        data: IStory[];
        loading: TBoolean;
    };
    modals: {
        addStoryModal: TBoolean;
    }
}

const initialState: IInitialState = {
    stories: {
        data: [],
        loading: false
    },
    modals: {
        addStoryModal: false
    }
}

const storieSlice = createSlice({
    name: 'storieSlice',
    initialState,
    reducers: {
        showAddStoryModal(state){
            state.modals.addStoryModal = !state.modals.addStoryModal
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStories.pending, (state) => {
                state.stories.loading = true
            })
            .addCase(getStories.fulfilled, (state, action: PayloadAction<IStory[]>) => {
                state.stories.loading = false
                state.stories.data = action.payload
            })
            .addCase(addStory.fulfilled, (state, action: PayloadAction<IStory>) => {
                state.stories.data = [...state.stories.data, action.payload]
                state.modals.addStoryModal = false
            })
    }
})

export const { showAddStoryModal } = storieSlice.actions
export default storieSlice.reducer