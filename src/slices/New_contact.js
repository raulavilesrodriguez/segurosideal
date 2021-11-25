import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const new_contact = createAsyncThunk(
    'capstone/new_contact',
    async ({name, phone, email, creador, token}, thunkAPI) => {
        console.log('token new_contact', token);
        try {
            const response = await fetch(
                'https://asesorseguro.herokuapp.com/capstone/new_contact/',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        email,
                        creador
                    }),
                }
            );
            let data = await response.json();
            console.log('response', data);
            if (response.status === 201) {
                return data;
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
    contact: {},
    LoadingContact: false,
    ErrorContact: false,
    SuccessContact: false,
    errorMessage: '',
}

const new_contactSlice = createSlice({
    name: 'new_contact',
    initialState,
    reducers: {
        clearNewContact: (state) =>{
            state.LoadingContact = false;
            state.ErrorContact = false;
            state.SuccessContact = false;
        }
    },
    extraReducers: {
        [new_contact.pending]: (state) => {
            state.LoadingContact = true;
        },
        [new_contact.fulfilled]: (state, {payload}) => {
            state.contact = payload;
            state.LoadingContact = false;
            state.ErrorContact = false;
            state.SuccessContact = true;
        },
        [new_contact.rejected]: (state, {payload}) => {
            console.log('error new contact', Object.values(payload)[0]);
            state.LoadingContact = false;
            state.ErrorContact = true;
            state.SuccessContact = false;
            state.errorMessage = Object.values(payload)[0];
        }
    }
});

export const {clearNewContact} = new_contactSlice.actions;
export const new_contactSelector = (state) => state.new_contact;
export default new_contactSlice.reducer;