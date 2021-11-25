import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getcustomers =  createAsyncThunk(
    'capstone/getcustomers',
    async ({pk, token}, thunkAPI) =>{
        try {
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/customers/${pk}/`,
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
    loadingCustomers: false,
    successCustomers: false,
    errorsCustomers: false,
    customers: {},
}

const customersSlice = createSlice({
    name:'getcustomers',
    initialState,
    reducers:{},
    extraReducers:{
        [getcustomers.pending]: (state) => {
            state.loadingCustomers = true;
            state.successCustomers = false;
            state.errorsCustomers = false;

        },
        [getcustomers.fulfilled]: (state, {payload}) => {
            state.customers = payload.customers;
            state.loadingCustomers = false;
            state.successCustomers = true;
            state.errorsCustomers = false;
        },
        [getcustomers.rejected]: (state) => {
            state.loadingCustomers = false;
            state.errorsCustomers = true;
            state.successCustomers = false;
            state.customers = {};
        }
    }
    });

    export const customersSelector = (state) => state.getcustomers;
    export default customersSlice.reducer;