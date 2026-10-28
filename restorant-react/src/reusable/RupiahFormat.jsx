
function FormatLengkap(angka){
    const nilai = Number(angka) || 0;

    return nilai.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
}

export default FormatLengkap;