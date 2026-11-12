import {it,describe, expect , vi, beforeEach}  from 'vitest';
import { render, waitFor , screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

vi.mock('axios');
vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn()
}));


describe("Login Page", () => {

    let mockNavigate;
    let inputUsername;
    let inputPassword;
    let buttonLogin;
    let user;

    beforeEach(()=>{

        vi.clearAllMocks();

        render(<Login/>);

        inputUsername = screen.getByTestId("inputUsername");
        inputPassword = screen.getByTestId("inputPassword");
        buttonLogin = screen.getByTestId("buttonLogin");
        user = userEvent.setup();
        mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);

    })

    it("Login Berhasil", async () => {

        axios.post.mockResolvedValue({
            status: 200
        })


        await user.type(inputUsername,"Christofel");
        await user.type(inputPassword, "HalodDek");
        await user.click(buttonLogin);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith("/");
        })
    })

    it("Login Gagal", async() =>{

        axios.post.mockRejectedValue({
            status:400
        })

        await user.type(inputUsername,"Christofel");
        await user.type(inputPassword, "HalodDek");
        await user.click(buttonLogin);

        await waitFor(() =>{
            expect(axios.post).toHaveBeenCalled();
            expect(screen.getByText("terjadi error pada akun atau server")).toBeInTheDocument();
        })

    })

    it("Password Kurang Dari 4 Karakter", async () => {

        await user.type(inputUsername, "Christofel");
        await user.type(inputPassword, "H");

        expect(axios.post).not.toHaveBeenCalled();

    });

})