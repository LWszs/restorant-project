
function ButtonTablePayment({page}){

    const button = "p-2 rounded-2xl min-w-[30%]";
    const styleActiveButton = "bg-black-green hover:bg-black-green-hover active:bg-black-green-active text-white";
    const styleDeactiveButton = "bg-gray-300 opacity-50 hover:opacity-100 active:opacity-70";

    return(
        <aside className='
            text-m flex justify-around gap-2 bg-pemilihan-pembelian 
            rounded-2xl whitespace-nowrap p-2
        '>

            <button className={`
                ${button} ${page == "Meja" ? styleActiveButton : styleDeactiveButton}
            `}>
                Memilih Meja
            </button>

            <span className="bg-black h-full w-0.5"></span>
            
            <button className={`
                ${button} ${page == "Payment" ? styleActiveButton : styleDeactiveButton}
            `}>
                Bawa Pulang
            </button>

        </aside>
    );
}

export default ButtonTablePayment;