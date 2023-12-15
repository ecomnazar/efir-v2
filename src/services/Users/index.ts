import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../constants/ApiEndpoints";
import { instance } from "../Api/Interceptor";
import { IUser } from "../../interfaces/IUser";
import { ICity, IRegion, TBoolean, TNumber, TString } from "../../interfaces/IGlobal";

export const getUsers = createAsyncThunk("getUsers", async () => {
  const response = await instance.get(`${API_ENDPOINTS.USERS}`);
  return response.data;
});

export const getUsersAsChannel = createAsyncThunk(`getUsersAsChannel`, async () => {
  const response = await instance.get(`${API_ENDPOINTS.USERS}?is_channel=True`);
  return response.data;
})

export const getUser = createAsyncThunk("getUser", async (id: TString) => {
  const response = await instance.get(`${API_ENDPOINTS.USER}/${id}`);
  return response.data;
});

export const postPremiumUser = createAsyncThunk(
  "postPremiumUser",
  async ({id, period}: { id: TString, period: TNumber }) => {
    const response = await instance.post(`${API_ENDPOINTS.PREMIUM_USER}`, {
      id,
      period
    });
    return response.data;
  }
);

export const deletePremiumUser = createAsyncThunk(
  "deletePremiumUser",
  async (id: string) => {
    const response = await instance.post(
      `${API_ENDPOINTS.DESTROY_PREMIUM_USER}`,
      { id }
    );
    return response.data;
  }
);

export const addUserAsChannel = createAsyncThunk(
  "addUser",
  async ({ formData }: any) => {
    const response = await instance.post(`${API_ENDPOINTS.USERS}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data
  }
);

export const getRegions = createAsyncThunk('getRegions', async () => {
  const response = await instance.get(`${API_ENDPOINTS.AUTH}/regions`)
  return response.data
})

export const getCities = createAsyncThunk('getCities', async () => {
  const response = await instance.get(`${API_ENDPOINTS.AUTH}/cities`)
  return response.data
})

interface IInitialState {
  users: {
    data: IUser[];
    loading: TBoolean;
  };
  usersAsChannel: {
    data: IUser[];
    loading: TBoolean;
  }
  user: {
    data: IUser;
    loading: TBoolean;
  };
  regions: {
    data: IRegion[];
    loading: TBoolean;
  };
  cities: {
    data: ICity[];
    loading: TBoolean;
  };
  modals: {
    addUserModal: TBoolean;
  };
}

const initialState: IInitialState = {
  users: {
    data: [],
    loading: false,
  },
  usersAsChannel: {
    data: [],
    loading: false
  },
  user: {
    data: null!,
    loading: false,
  },
  regions: {
    data: [],
    loading: false
  },
  cities: {
    data: [],
    loading: false
  },
  modals: {
    addUserModal: false,
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    openAddUserModal: (state) => {
      state.modals.addUserModal = true;
    },
    closeAddUserModal: (state) => {
      state.modals.addUserModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users.loading = false;
        state.users.data = action.payload;
      })
      .addCase(getUsersAsChannel.pending, (state) => {
        state.usersAsChannel.loading = true;
      })
      .addCase(getUsersAsChannel.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.usersAsChannel.loading = false;
        state.usersAsChannel.data = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user.loading = false;
        state.user.data = action.payload;
      })
      .addCase(getCities.pending, (state) => {
        state.cities.loading = true
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities.data = action.payload
      })
      .addCase(getRegions.pending, (state) => {
        state.regions.loading = true
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.regions.data = action.payload
      })
  },
});

export const { openAddUserModal, closeAddUserModal } = userSlice.actions;
export default userSlice.reducer;
