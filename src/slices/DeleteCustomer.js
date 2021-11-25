import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const deletecustomer = createAsyncThunk(
    'capstone/deletecustomer',
    async({customer_id, token}, thunkAPI) => {
        try{
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/edit_customer/${customer_id}/`,
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
                console.log('Delete Customer', data);
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
    LoadingDeleteCustomer: false,
    ErrorDeleteCustomer: false,
    SuccessDeleteCustomer: false,
    successMessage: '',
}

const deletecustomerSlice = createSlice({
    name: 'deletecustomer',
    initialState,
    reducers: {
        clearDelete: (state) => {
            state.LoadingDeleteCustomer = false;
            state.ErrorDeleteCustomer = false;
            state.SuccessDeleteCustomer = false;
            state.successMessage = '';

            return state;
        },
    },
    extraReducers: {
        [deletecustomer.pending]: (state) => {
            state.LoadingDeleteCustomer = true;
            state.SuccessDeleteCustomer = false;
            state.ErrorDeleteCustomer = false;
        },
        [deletecustomer.fulfilled]: (state, {payload}) => {
            state.LoadingDeleteCustomer = false;
            state.SuccessDeleteCustomer = true;
            state.ErrorDeleteCustomer = false;
            state.successMessage = payload.delete;
        },
        [deletecustomer.rejected]: (state) => {
            state.LoadingDeleteCustomer = false;
            state.SuccessDeleteCustomer = false;
            state.ErrorDeleteCustomer = true;
        }
    }
});

export const {clearDelete} = deletecustomerSlice.actions;
export const deletecustomerSelector = (state) => state.deletecustomer;
export default deletecustomerSlice.reducer;