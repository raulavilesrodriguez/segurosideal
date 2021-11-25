import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const newcustomer = createAsyncThunk(
    'capstone/newcustomer',
    async({contacto, planes, payment, age, token}, thunkAPI) => {
        try {
            const response = await fetch(
                'https://asesorseguro.herokuapp.com/capstone/new_customer/',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contacto,
                        planes,
                        payment,
                        age
                    }),
                }
            );
            let data = await response.json();
            console.log('Response New customer', data);
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
    messageNewCustomer: '',
    loadingNewCustomer: false,
    errorNewCustomer: false,
    successNewCustomer: false,
    errormessageNewCustomer: '',
}

const newcustomerSlice = createSlice({
    name:'newcustomer',
    initialState,
    reducers: {
        clearNewCustomer: (state) =>{
            state.loadingNewCustomer = false;
            state.errorNewCustomer = false;
            state.successNewCustomer = false;
            state.messageNewCustomer = '';
            state.errormessageNewCustomer = '';
        }
    },
    extraReducers: {
        [newcustomer.pending]: (state) => {
            state.loadingNewCustomer = true;
        },
        [newcustomer.fulfilled]: (state, {payload}) => {
            console.log('New customer éxito', payload);
            state.messageNewCustomer = payload;
            state.loadingNewCustomer = false;
            state.successNewCustomer = true;
            state.errorNewCustomer = false;
        },
        [newcustomer.rejected]: (state, {payload}) => {
            console.log('New customer error', payload);
            state.loadingNewCustomer = false;
            state.successNewCustomer = false;
            state.errorNewCustomer = true;
            state.errormessageNewCustomer = payload;
        }
    }
});

export const {clearNewCustomer} = newcustomerSlice.actions;
export const newcustomerSelector = (state) => state.newcustomer;
export default newcustomerSlice.reducer;