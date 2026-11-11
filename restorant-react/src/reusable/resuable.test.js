import {it,describe, expect , vi, beforeEach}  from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {Navigate, useNavigate } from 'react-router-dom';
import LogOutReuse from './LogOutReuse';
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

describe("LogOut", () => {

    const mockNavigate = vi.fn();

    beforeEach(() => {
        
        vi.clearAllMocks();

    })

    it("Tes Log Out berhasil", async () => {

        axios.get.mockResolvedValue({
            status: 200
        })

        await LogOutReuse(mockNavigate);

        expect(axios.get).toHaveBeenCalledWith("/api/logOut");
        expect(mockNavigate).toHaveBeenCalledWith("/Login");

    })

    it("Tes Log out selain 200",  async() => {

        axios.get.mockResolvedValue({
            status: 400
        })

        await LogOutReuse(mockNavigate);

        expect(axios.get).toHaveBeenCalledWith("/api/logOut");
        expect(mockNavigate).not.toHaveBeenCalled();

    })

    it("Tes Log Out error", async () =>{

        axios.get.mockRejectedValue(new Error("LogOut Gagal"));

        await LogOutReuse(mockNavigate);

        expect(axios.get).toHaveBeenCalledWith("/api/logOut");
        expect(mockNavigate).toHaveBeenCalledWith("/Login")

    })

});
