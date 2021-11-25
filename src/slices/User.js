import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const UserInfo = createAsyncThunk(
    'users/UserInfo',
    async ({token}, thunkAPI) => {
        try {
            const response = await fetch(
                'https://asesorseguro.herokuapp.com/capstone/auth/user/',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    username: '',
    email: '',
    pk: '',
    isLoading: false,
    isSuccess: false,
    isErrorUser: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) =>{
            state.isSuccess = false;
            state.isLoading = false;
            state.isErrorUser = false;
        }
    },
    extraReducers: {
        [UserInfo.pending]: (state) => {
            state.isLoading = true;
        },
        [UserInfo.fulfilled]: (state, {payload}) => {
            state.username = payload.username;
            state.email = payload.email;
            state.pk = payload.pk;
            state.isLoading = false;
            state.isSuccess = true;
            state.isErrorUser = false;
        },
        [UserInfo.rejected]: (state) => {
            state.isLoading = false;
            state.isErrorUser = true;
        }
    }
});

export const {clearUser} = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;