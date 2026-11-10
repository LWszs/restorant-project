import FormatLengkap from "../reusable/RupiahFormat";

function PaymentQueue({orderCart_id,orderCart_quantity,product_name,product_img,product_price}){
    return(
        <figure className="flex items-center gap-2">
            <img src={`/food/${product_img}.webp`} alt={product_name} width={50} className="rounded-2xl"/>
            <figcaption className="text-sm flex items-center w-full">
                <div className="flex w-[70%] gap-2 border">
                    <div className="w-[60%]">   
                        <p className="overflow-x-auto whitespace-nowrap">{product_name}</p>
                        <p className="text-xs">{product_price}</p>
                    </div>
                    <p className="w-[20%] overflow-auto">x{orderCart_quantity}</p>
                </div>
                <p className=" overflow-x-auto">
                    {FormatLengkap(product_price * orderCart_quantity)}
                </p>
            </figcaption>
        </figure>
    );
}

export default PaymentQueue;