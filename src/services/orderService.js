import { httpService } from './httpService';

export const orderService = {
    getOrderList: ({ page, pageSize }) => {
        return httpService.get(`/order?page=${page}&pageSize=${pageSize}`);
    },
    getOrderInfo: (id) => {
        return httpService.get(`/order/${id}`)
    },
    updateOrderStatus: ({ orderId, newOrderInfo }) => {
        return httpService.put(`/order/${orderId}?orderStatus=${newOrderInfo.orderStatus}`);
    },
}