import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getplans = createAsyncThunk(
    'capstone/plans', 
    async({token}, thunkAPI) => {
        try {
            const response = await fetch(
                'https://asesorseguro.herokuapp.com/capstone/plans/',
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
            console.log('Error Plans', error);
            thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    loadingPlans: false,
    successPlans: false,
    errorsPlans: false,
    plans: [],
}

const getplansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {},
    extraReducers: {
        [getplans.pending]: (state) =>{
            state.loadingPlans = true;
        },
        [getplans.fulfilled]: (state, {payload}) =>{
            console.log('Plans', payload.plans)
            state.plans = payload.plans;
            state.loadingPlans = false;
            state.errorsPlans = false;
            state.successPlans = true;
        },
        [getplans.rejected]: (state) => {
            state.loadingPlans = false;
            state.errorsPlans = true;
        }
    }
});

export const plansSelector = (state) => state.plans;
export default getplansSlice.reducer;
