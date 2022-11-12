import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { orderService } from '../services/orderService';


export const getOrderList = createAsyncThunk('orderSlice/getOrderList', async (pagination, thunkAPI) => {
    try {
        const result = await orderService.getOrderList(pagination);
        return result.data;
    } catch (error) {
        message.error(error.response.data.message);
        return thunkAPI.rejectWithValue();
    }
});

export const getOrderInfo = createAsyncThunk('orderSlice/getOrderInfo', async (id, thunkAPI) => {
    try {
        const result = await orderService.getOrderInfo(id);
        //thunkAPI.dispatch(toggleViewOrderDetail());
        return result.data;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

export const updateStatusOrder = createAsyncThunk('orderSlice/updateStatusOrder', async (data, thunkAPI) => {
    console.log("data api; ", data)
    try {
        const result = await orderService.updateOrderStatus(data);

        thunkAPI.dispatch(toggleEditOrderModal());
        thunkAPI.dispatch(getOrderList({ page: 1, pageSize: 10 }));
        message.success('Cập nhật trạng thái thành công!');

        return result.data;
    } catch (error) {
        message.error(error.response.data.message);
        return thunkAPI.rejectWithValue();
    }
});


const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        orderList: [],
        currentOrder: {},
        modalEditOrder: false,
        modalAdd: false,

        modalViewOrderDetail: false,
    },
    reducers: {
        toggleEditOrderModal: (state, action) => {
            state.modalEditOrder = !state.modalEditOrder;
        },
        toggleAddOrderModal: (state, action) => {
            state.modalAdd = !state.modalAdd;
        },
        toggleViewOrderDetail: (state, action) => {
            state.modalViewOrderDetail = !state.modalViewOrderDetail;
        }
    },
    extraReducers: {
        [getOrderList.pending]: (state, action) => {
            state.orderList = [];
        },
        [getOrderList.fulfilled]: (state, action) => {
            state.orderList = action.payload;
        },
        [getOrderList.rejected]: (state, action) => { },
        [getOrderInfo.pending]: (state, action) => {
            state.currentOrder = action.payload;
        },
        [getOrderInfo.fulfilled]: (state, action) => {
            state.currentOrder = action.payload;
        },
        [getOrderInfo.rejected]: (state, action) => { },
    },
});
const { reducer, actions } = orderSlice;
export const { toggleEditOrderModal, toggleAddOrderModal, toggleViewOrderDetail } = actions;
export default reducer;