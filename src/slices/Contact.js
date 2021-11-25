import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getcontact = createAsyncThunk(
    'capstone/add_contact',
    async({contact_id, token}, thunkAPI) =>{
        console.log('contact_id', contact_id);
        console.log('toke99', token)
        try{
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/contact/${contact_id}/`,
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
        } catch(error) {
            console.log('Error GET Contact', error);
            thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    loadingContact: false,
    successContact: false,
    errorsContact: false,
    contact: '',
}

const getcontactSlice = createSlice({
    name:'contact',
    initialState,
    reducers:{},
    extraReducers: {
        [getcontact.pending]: (state) =>{
            state.loadingContact = true;
        },
        [getcontact.fulfilled]: (state, {payload}) =>{
            console.log('Contact', payload)
            state.contact = payload;
            state.loadingContact = false;
            state.errorsContact = false;
            state.successContact = true;
        },
        [getcontact.rejected]: (state) => {
            state.loadingContact = false;
            state.errorsContact = true;
        }
    }
});

export const getcontactSelector = (state) => state.contact;
export default getcontactSlice.reducer;