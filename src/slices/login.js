import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ username, password }, thunkAPI) => {
      try {
        const response = await fetch(
          'https://asesorseguro.herokuapp.com/capstone/auth/login/',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );
        let data = await response.json();
        console.log('response', data);
        if (response.status === 200) {
          localStorage.setItem('token', data.key);
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (error) {
        console.log('Error', error);
        thunkAPI.rejectWithValue(error);
      }
    }
  );

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearState: (state) => {
          state.isError = false;
          state.isSuccess = false;
          state.isLoading = false;
        }},
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },

        [loginUser.fulfilled]: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },

        [loginUser.rejected]: (state, { payload }) => {
            console.log('error login', Object.values(payload)[0]);
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = Object.values(payload)[0];
        },
    }
});

export const { clearState } = loginSlice.actions;
export const loginSelector = (state) => state.login;
export default loginSlice.reducer;
