import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { instance } from "../Api/Interceptor";
import { ILogin } from "../../interfaces/ILogin";
import { TBoolean, TString } from "../../interfaces/IGlobal";
import { saveToken } from "../../helpers/Token";

export const login = createAsyncThunk('login', async ({ username, password }: ILogin) => {
    const data = {
        username,
        password
    }
    const response = await instance.post(`${API_ENDPOINTS.LOGIN}`, data)
    return response.data
})

interface IInitialState {
    loading: TBoolean;
}

const initialState: IInitialState = {
    loading: false
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: TString }>) => {
                state.loading = false
                saveToken(action.payload.token)
                window.location.replace('/')
            })
    },
})

export default loginSlice.reducer