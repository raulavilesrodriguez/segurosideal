import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const putcustomer = createAsyncThunk(
    'capstone/putcustomer',
    async({contacto, planes, payment, age, customer_id, token}, thunkAPI) => {
        try{
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/edit_customer/${customer_id}/`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contacto,
                        planes,
                        payment,
                        age,
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                console.log('Actualizar Customer', data);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch(error) {
            console.log('Error GET Customer', error);
            thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    LoadingPutCustomer: false,
    ErrorPutCustomer: false,
    SuccessPutCustomer: false,
}

const putcustomerSlice = createSlice({
    name: 'putcustomer',
    initialState,
    reducers: {
        clearPutCustomer: (state) => {
            state.LoadingPutCustomer = false;
            state.ErrorPutCustomer = false;
            state.SuccessPutCustomer = false;

            return state;
        },
    },
    extraReducers: {
        [putcustomer.pending]: (state) => {
            state.LoadingPutCustomer = true;
            state.SuccessPutCustomer = false;
            state.ErrorPutCustomer = false;
        },
        [putcustomer.fulfilled]: (state) => {
            state.LoadingPutCustomer = false;
            state.SuccessPutCustomer = true;
            state.ErrorPutCustomer = false;
        },
        [putcustomer.rejected]: (state) => {
            state.LoadingPutCustomer = false;
            state.SuccessPutCustomer = false;
            state.ErrorPutCustomer = true;
        }
    }
});

export const {clearPutCustomer} = putcustomerSlice.actions;
export const putcustomerSelector = (state) => state.putcustomer;
export default putcustomerSlice.reducer;