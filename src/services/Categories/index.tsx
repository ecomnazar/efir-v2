import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceSecond } from "../Api/Interceptor";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { ICategory } from "../../interfaces/ICategory";
import { TBoolean, TNumber, TString } from "../../interfaces/IGlobal";
import toast from "react-hot-toast";

export const getCategories = createAsyncThunk('getCategories', async () => {
    const response = await instanceSecond.get(`${API_ENDPOINTS.CATEGORY}`)
    return response.data
})

export const addCategory = createAsyncThunk('addCategory', async ({ name }: { name: TString }) => {
    const response = await instanceSecond.post(`${API_ENDPOINTS.CATEGORY}`, { name })
    return response.data
})

export const updateCategory = createAsyncThunk('updateCategory', async ({ data }: { data: { id: TNumber; name: TString } }) => {
    const response = await instanceSecond.patch(`${API_ENDPOINTS.CATEGORY}`, data)
    return response.data
})

export const deleteCategory = createAsyncThunk('deleteCategory', async ({ id }: { id: TNumber }) => {
    const data = {
        id
    }
    const response = await instanceSecond.delete(`${API_ENDPOINTS.CATEGORY}`, { data })
    return response.data
})

interface IInitialState {
    categories: {
        data: ICategory[];
        loading: TBoolean;
    };
    modals: {
        addCategoryModal: TBoolean;
    }
}

const initialState: IInitialState = {
    categories: {
        data: [],
        loading: false
    },
    modals: {
        addCategoryModal: false
    }
}

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        showAddCategoryModal(state){
            state.modals.addCategoryModal = !state.modals.addCategoryModal
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.categories.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<{ results: ICategory[] }>) => {
                state.categories.loading = false
                state.categories.data = action.payload.results
            })
            .addCase(addCategory.pending, () => {
                // state.admins.loading = true
            })
            .addCase(addCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
                // state.admins.loading = false
                // state.admins.data = action.payload
                state.modals.addCategoryModal = false
                state.categories.data = [...state.categories.data, action.payload]
                toast.success('Success')
            })
    }
})

export const { showAddCategoryModal } = categorySlice.actions
export default categorySlice.reducer