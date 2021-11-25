import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const putcontact = createAsyncThunk(
    'capstone/putcontact',
    async({name, phone, email, creador, contact_id, token}, thunkAPI) => {
        try{
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/edit_contact/${contact_id}/`,
                {
                    method: 'PUT',
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
    LoadingPutContact: false,
    ErrorPutContact: false,
    SuccessPutContact: false,
}

const putcontactSlice = createSlice({
    name: 'putcontact',
    initialState,
    reducers: {},
    extraReducers: {
        [putcontact.pending]: (state) => {
            state.LoadingPutContact = true;
            state.SuccessPutContact = false;
            state.ErrorPutContact = false;
        },
        [putcontact.fulfilled]: (state) => {
            state.LoadingPutContact = false;
            state.SuccessPutContact = true;
            state.ErrorPutContact = false;
        },
        [putcontact.rejected]: (state) => {
            state.LoadingPutContact = false;
            state.SuccessPutContact = false;
            state.ErrorPutContact = true;
        }
    }
});

export const putcontactSelector = (state) => state.putcontact;
export default putcontactSlice.reducer;