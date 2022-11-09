import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { menuService } from '../services/menuService.js';

export const createMenu = createAsyncThunk('menuSlice/createMenu', async (menuInfo, thunkAPI) => {
    try {
        const result = await menuService.createMenu(menuInfo)
        thunkAPI.dispatch(toggleAddMenuModal());
        thunkAPI.dispatch(getMenuList({ page: 1, pageSize: 10 }));
        message.success('Tạo menu thành công!');
        return result.data;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
})

export const getMenuList = createAsyncThunk('menuSlice/getMenuList', async (pagination, thunkAPI) => {
    try {
        const result = await menuService.getMenuList(pagination);
        return result.data;
    } catch (error) {
        message.error(error.response.data.message);
        return thunkAPI.rejectWithValue();
    }
});

export const getMenuInfo = createAsyncThunk('menuSlice/getMenuInfo', async (menuId, thunkAPI) => {
    try {
        const result = await menuService.getMenuInfo(menuId);
        return result.data;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

export const updateMenu = createAsyncThunk('menuSlice/updateMenu', async (data, thunkAPI) => {
    try {
        const result = await menuService.updateMenu(data);

        thunkAPI.dispatch(toggleEditMenuModal());
        thunkAPI.dispatch(getMenuList({ page: 1, pageSize: 10 }));
        message.success('Cập nhật menu thành công!');

        return result.data;
    } catch (error) {
        message.error(error.response.data.message);
        return thunkAPI.rejectWithValue();
    }
});


const menuSlice = createSlice({
    name: 'menuSlice',
    initialState: {
        menuList: [],
        currentMenu: {},
        modalAddMenu: false,
        modalEditMenu: false,
    },
    reducers: {
        toggleAddMenuModal: (state, action) => {
            state.modalAddMenu = !state.modalAddMenu
        },
        toggleEditMenuModal: (state, action) => {
            state.modalEditMenu = !state.modalEditMenu
        }
    },
    extraReducers: {
        [getMenuList.pending]: (state, action) => {
            state.menuList = [];
        },
        [getMenuList.fulfilled]: (state, action) => {
            state.menuList = action.payload;
        },
        [getMenuList.rejected]: (state, action) => { },

        [getMenuInfo.pending]: (state, action) => {
            state.currentMenu = action.payload;
        },
        [getMenuInfo.fulfilled]: (state, action) => {
            state.currentMenu = action.payload;
        },
        [getMenuInfo.rejected]: (state, action) => { },
    }
})

const { reducer, actions } = menuSlice;
export const { toggleEditMenuModal, toggleAddMenuModal } = actions;
export default reducer;