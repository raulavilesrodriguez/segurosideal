import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const deletecontact = createAsyncThunk(
    'capstone/deletecontact',
    async({contact_id, token}, thunkAPI) => {
        try{
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/edit_contact/${contact_id}/`,
                {
                    method: 'DELETE',
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
    LoadingDeleteContact: false,
    ErrorDeleteContact: false,
    SuccessDeleteContact: false,
}

const deletecontactSlice = createSlice({
    name: 'deletecontact',
    initialState,
    reducers: {},
    extraReducers: {
        [deletecontact.pending]: (state) => {
            state.LoadingDeleteContact = true;
            state.SuccessDeleteContact = false;
            state.ErrorDeleteContact = false;
        },
        [deletecontact.fulfilled]: (state) => {
            state.LoadingDeleteContact = false;
            state.SuccessDeleteContact = true;
            state.ErrorDeleteContact = false;
        },
        [deletecontact.rejected]: (state) => {
            state.LoadingDeleteContact = false;
            state.SuccessDeleteContact = false;
            state.ErrorDeleteContact = true;
        }
    }
});

export const deletecontactSelector = (state) => state.deletecontact;
export default deletecontactSlice.reducer;