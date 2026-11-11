import {it,describe, expect , vi, beforeEach}  from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {useNavigate } from 'react-router-dom';
import FormatLengkap from './RupiahFormat';
import axios from 'axios';
import useAuth from './Auth';

vi.mock('axios');
vi.mock("react-router-dom", () => ({
    useNavigate:vi.fn()
}));

describe("Format Lengkap", ()=>{

    it("Cek Format dari 20000 ke Rp 20.000", () => {
    expect(FormatLengkap(20000).replace(/\u00A0/g, " "))
        .toBe("Rp 20.000");
    });

    it("Cek bukan angka menjadi string", () => {
    expect(FormatLengkap("a").replace(/\u00A0/g, " "))
        .toBe("Rp 0");
    });

    it('Cek angka 0', () => {
        expect(FormatLengkap(0).replace(/\u00A0/g, " "))
        .toBe("Rp 0");
    })

});

// 1. Mock Axios
vi.mock('axios');

// 2. Mock useNavigate
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn()
}));

describe('useAuth', () => {

    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useNavigate.mockReturnValue(mockNavigate);
    });

    it('tidak redirect ketika autentikasi berhasil', async () => {

        axios.get.mockResolvedValue({
            data: 'Berhasil'
        });

        renderHook(() => useAuth());

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                '/api/employee/check',
                { withCredentials: true }
            );
        });

        expect(mockNavigate).not.toHaveBeenCalled();

    });

    it('redirect ke Login ketika autentikasi gagal', async () => {

        axios.get.mockRejectedValue(
            new Error('Unauthorized')
        );

        renderHook(() => useAuth());

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/Login');
        });

    });

});


