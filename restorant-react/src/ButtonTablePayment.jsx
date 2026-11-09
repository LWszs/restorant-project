import { Link } from "react-router-dom";

function ButtonTablePayment({page}){

    const button = "p-2 rounded-2xl min-w-[30%]";
    const styleActiveButton = "bg-black-green hover:bg-black-green-hover active:bg-black-green-active text-white";
    const styleDeactiveButton = "bg-gray-300 opacity-50 hover:opacity-100 active:opacity-70";

    return(

        <aside className='
            text-m flex justify-around gap-2 bg-pemilihan-pembelian 
            rounded-2xl whitespace-nowrap p-2
        '>
            <Link to={"/TablePicker"}>
                <button className={`
                    ${button} ${page == "Meja" ? styleActiveButton : styleDeactiveButton}
                `}>
                    Memilih Meja
                </button>
            </Link>

            <div className="bg-black min-h-8px w-0.5"></div>
            
            <Link to={"/PaymentTakeAway"}>
                <button className={`
                    ${button} ${page == "Payment" ? styleActiveButton : styleDeactiveButton}
                `}>
                    Bawa Pulang
                </button>
            </Link>

        </aside>
    );
}

export default ButtonTablePayment;