import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk(
    'users/Signup',
    async ({email, username, password1, password2}, thunkAPI) => {
        try {
            const response = await fetch(
                'https://asesorseguro.herokuapp.com/capstone/auth/register/',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        username, 
                        password1, 
                        password2
                    }),
                }
            );
            let data = await response.json();
            console.log('Signup', data);
            console.log('respuesta', response.status);

            if (response.status === 201) {
                localStorage.setItem('token', data.key);
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log('Error', error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
}

const signupSlice = createSlice({
    name: 'signup', 
    initialState,
    reducers: {
        clearSignup: (state) =>{
            state.isSuccess = false;
            state.isError = false;
            state.isLoading = false;
        },
    },
    extraReducers: {
        [signupUser.pending]: (state) => {
            state.isLoading = true;
        },
        [signupUser.fulfilled]: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [signupUser.rejected]: (state, {payload}) => {
            console.log('error', Object.values(payload)[0]);
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = Object.values(payload)[0];
        }
    },
});

export const {clearSignup} = signupSlice.actions;
export const signupSelector = (state) => state.signup;
export default signupSlice.reducer;