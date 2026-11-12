import FormatLengkap from "../reusable/RupiahFormat";

function PaymentQueue({orderCart_id,orderCart_quantity,product_name,product_img,product_price}){
    return(
        <figure className="flex items-center gap-2">
            <img src={`/food/${product_img}.webp`} alt={product_name} width={50} className="rounded-2xl"/>
            <figcaption className="text-sm flex items-center justify-between w-full gap-3">
                <div className="flex flex-col">
                    <p className="truncate whitespace-nowrap">{product_name}</p>
                    <p className="text-xs">{product_price}</p>
                </div>
                <div className="flex flex-col items-end text-xs">
                    <p>{FormatLengkap(orderCart_quantity * product_price)}</p>
                    <p>x{orderCart_quantity}</p>
                </div>
            </figcaption>
        </figure>
    );
}

export default PaymentQueue;