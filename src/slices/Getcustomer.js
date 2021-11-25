import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getcustomer = createAsyncThunk(
    'capstone/get_customer',
    async ({contact_id, token}, thunkAPI) =>{
        try{
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/customer/${contact_id}/`,
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
    loadingCustomer: false,
    successCustomer: false,
    errorsCustomer: false,
    customer: {},
}

const getcustomerSlice = createSlice({
    name:'getcustomer',
    initialState,
    reducers:{},
    extraReducers:{
        [getcustomer.pending]: (state) => {
            state.loadingCustomer = true;
            state.successCustomer = false;
            state.errorsCustomer = false;

        },
        [getcustomer.fulfilled]: (state, {payload}) => {
            state.customer = payload.customer;
            state.loadingCustomer = false;
            state.successCustomer = true;
            state.errorsCustomer = false;
        },
        [getcustomer.rejected]: (state) => {
            state.loadingCustomer = false;
            state.errorsCustomer = true;
            state.successCustomer = false;
            state.customer = {};
        }
    }
    });

    export const getcustomerSelector = (state) => state.getcustomer;
    export default getcustomerSlice.reducer;