import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../Api/Interceptor";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { IAddAdmin, IAdmin } from "../../interfaces/IAdmin";
import { TBoolean } from "../../interfaces/IGlobal";
import toast from "react-hot-toast";

export const getAdmins = createAsyncThunk('getAdmins', async () => {
    const response = await instance.get(`${API_ENDPOINTS.ADMINS}`)
    return response.data
})

export const addAdmin = createAsyncThunk(
    "addAdmin",
    async ({ username, password, region, phone_number, gender }: IAddAdmin) => {
      const data = {
        username,
        password,
        region,
        phone_number,
        gender
      };
      const response = await instance.post(API_ENDPOINTS.ADMINS, data);
      return response.data;
    }
);

export const deleteAdmin = createAsyncThunk('deleteAdmin', async ({ id }: { id: string }) => {
    try {
        await instance.delete(`${API_ENDPOINTS.ADMINS}`, {
            data: {
                id
            }
        })
        toast.success('Deleted succesfully')
    } catch (error) {
        toast.success('Delete error')
    }
})


interface IInitialState {
    admins: {
        data: IAdmin[];
        loading: TBoolean;
    };
    modals: {
        addAdminModal: TBoolean;
    }
}

const initialState: IInitialState = {
    admins: {
        data: [],
        loading: false
    },
    modals: {
        addAdminModal: false
    }
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        showAddAdminModal(state){
            state.modals.addAdminModal = !state.modals.addAdminModal
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdmins.pending, (state) => {
                state.admins.loading = true
            })
            .addCase(getAdmins.fulfilled, (state, action: PayloadAction<IAdmin[]>) => {
                state.admins.loading = false
                state.admins.data = action.payload
            })
            .addCase(addAdmin.pending, (state) => {
                // state.admins.loading = true
            })
            .addCase(addAdmin.fulfilled, (state, action: PayloadAction<IAdmin>) => {
                // state.admins.loading = false
                // state.admins.data = action.payload
                state.modals.addAdminModal = false
                state.admins.data = [...state.admins.data, action.payload]
                toast.success('Success')
            })
    }
})

export const { showAddAdminModal } = adminSlice.actions
export default adminSlice.reducer