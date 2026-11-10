import {it,describe, expect}  from 'vitest';
import FormatLengkap from './RupiahFormat';

describe("Format Lengkap", ()=>{

    it("Cek Format dari 20000 ke Rp 20.000", () => {
    expect(FormatLengkap(20000).replace(/\u00A0/g, " "))
        .toBe("Rp 20.000");
    });

    it("Cek bukan angka menjadi string", () => {
    expect(FormatLengkap("a").replace(/\u00A0/g, " "))
        .toBe("Rp 0");
    });

});