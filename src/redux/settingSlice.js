import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { settingService } from '../services/settings';


export const getListTimeSlot = createAsyncThunk('settingSlice/getListTimeSlot', async (id, thunkAPI) => {
    try {
        const result = await settingService.getListTimeSlot();
        return result.data.results;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

const settingSlice = createSlice({
    name: 'settingSlice',
    initialState: {
        listTimeSlot: [],
    },
    reducers: {
    },
    extraReducers: {
        [getListTimeSlot.pending]: (state, action) => {
            state.listTimeSlot = [];
        },
        [getListTimeSlot.fulfilled]: (state, action) => {
            state.listTimeSlot = action.payload;
        },
        [getListTimeSlot.rejected]: (state, action) => { },
    },
});
const { reducer } = settingSlice;
export default reducer;