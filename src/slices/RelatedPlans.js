import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const relatedplans = createAsyncThunk(
    'capstone/graphcontacts',
    async ({pk, token}, thunkAPI) =>{
        try {
            const response = await fetch(
                `https://asesorseguro.herokuapp.com/capstone/related_plans/${pk}/`,
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
    loadingPlanCustomers: false,
    successPlanCustomers: false,
    errorsPlanCustomers: false,
    PlanCustomers: {},
}

const plancusntomersSlice = createSlice({
    name: 'plancustomers',
    initialState,
    reducers: {},
    extraReducers: {
        [relatedplans.pending]: (state) =>{
            state.loadingPlanCustomers = true;
            state.errorsPlanCustomers = false;
            state.successPlanCustomers = false;
        },
        [relatedplans.fulfilled]: (state, {payload}) => {
            console.log('PlanCustomers', payload.plans_customers);
            state.PlanCustomers = payload.plans_customers;
            state.loadingPlanCustomers = false;
            state.errorsPlanCustomers = false;
            state.successPlanCustomers = true;
        },
        [relatedplans.rejected]: (state) => {
            state.loadingPlanCustomers = false;
            state.errorsPlanCustomers = true;
            state.successPlanCustomers = false;
        }
    }
}
);

export const plancustomersSelector = (state) => state.plancustomers;
export default plancusntomersSlice.reducer;

