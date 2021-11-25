import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const get_contacts = createAsyncThunk(
    'capstone/contacts',
    async ({pk, token}, thunkAPI) =>{
        console.log('TOKENN',token);
        console.log('id_usuario', pk);
        try {
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/contacts/${pk}/`,
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
    loadingContacts: false,
    successContacts: false,
    errorsContacts: false,
    contacts: [],
}

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: {
        [get_contacts.pending]: (state) =>{
            state.loadingContacts = true;
        },
        [get_contacts.fulfilled]: (state, {payload}) => {
            console.log('Contacts', payload.contacts);
            state.contacts = payload.contacts;
            state.loadingContacts = false;
            state.errorsContacts = false;
            state.successContacts = true;
        },
        [get_contacts.rejected]: (state) => {
            state.loadingContacts = false;
            state.errorsContacts = true;
        }
    }
}
);

export const contactSelector = (state) => state.contacts;
export default contactSlice.reducer;

