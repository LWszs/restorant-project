
import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, renderHook, waitFor } from '@testing-library/react';
import { OrderProvider, useOrder } from './OrderContext';
import axios from 'axios';
import { act } from 'react';

vi.mock('axios');

describe("useOrder", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        axios.get.mockImplementation((urlpath) => {
            if (urlpath === '/api/order/getAllOrder') {
                return Promise.resolve({
                    data: [
                        { nama: "nasi goreng" },
                        { nama: "Tempe goreng" }
                    ]
                });
            }

            if (urlpath === '/api/order/getTotalPrice') {
                return Promise.resolve({
                    data: [
                        { totalPriceOrder: 15000 }
                    ]
                });
            }
        });
    });

    it("Cek Order Data", async () => {

        const { result } = renderHook(() => useOrder(), {
            wrapper: OrderProvider
        });

        await waitFor(() => {
            expect(result.current.orderData).toHaveLength(2);
            expect(result.current.totalPrice).toBe(15000);
        });

    });

    it("Cek Refresh", async () => {

        const { result } = renderHook(() => useOrder(), {
            wrapper: OrderProvider
        });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2);
        });

        act(() =>{
            result.current.setRefresh(true);
        })

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(4);
        })

    });

    it("Error", async() => {

        const consoleSpy = vi.spyOn(console,'log').mockImplementation(() => {});

        axios.get.mockRejectedValue(new Error("Terjadi Error"));

        const { result } = renderHook(() => useOrder(), {
            wrapper: OrderProvider
        });

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        })

        consoleSpy.mockRestore();

    })

});
