import {it,describe, expect , vi, beforeEach}  from 'vitest';
import { useNavigate } from "react-router-dom";
import FormatLengkap from './RupiahFormat';
import { useNavigate } from 'react-router-dom';


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

