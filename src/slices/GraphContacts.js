import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const graphcontacts = createAsyncThunk(
    'capstone/graphcontacts',
    async ({pk}, thunkAPI) =>{
        try {
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/graph_contacts/${pk}/`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
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
    loadingGcontacts: false,
    successGcontacts: false,
    errorsGcontacts: false,
    Gcontacts: [],
}

const gcontactsSlice = createSlice({
    name: 'graphcontacts',
    initialState,
    reducers: {},
    extraReducers: {
        [graphcontacts.pending]: (state) =>{
            state.loadingGcontacts = true;
            state.errorsGcontacts = false;
            state.successGcontacts = false;
        },
        [graphcontacts.fulfilled]: (state, {payload}) => {
            console.log('GraphContacts', payload.contacts);
            state.Gcontacts = payload.contacts;
            state.loadingGcontacts = false;
            state.errorsGcontacts = false;
            state.successGcontacts = true;
        },
        [graphcontacts.rejected]: (state) => {
            state.loadingGcontacts = false;
            state.errorsGcontacts = true;
            state.successGcontacts = false;
        }
    }
}
);

export const gcontactsSelector = (state) => state.graphcontacts;
export default gcontactsSlice.reducer;

