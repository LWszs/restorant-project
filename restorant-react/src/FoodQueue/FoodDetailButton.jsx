
function FoodDetailButton({setExpand, expand,teks}){
    return(
        <div className="flex gap-2 sm:hidden">
            <button className="
            hover:opacity-50 active:opacity-70 cursor-pointer" 
            onClick={() => setExpand(!expand)}>
                Detail {teks}
            </button>
            <p className={`transition-all duration-500 ${expand ? "rotate-180" : ""}`}>
                &#9650;
            </p>
        </div>
    );
}

export default FoodDetailButton;