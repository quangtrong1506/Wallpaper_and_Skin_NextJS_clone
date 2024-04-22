interface _IProps {
    type?: "icon" | "input-and-icon" | "input";
}
function SearchBox({ type = "input-and-icon" }: _IProps) {
    return (
        <div
            className={
                "h-[40px] flex justify-center items-center content-center " +
                (type === "input" ? "w-48" : type === "input-and-icon" ? "w-32" : "w-[40px] rounded-md hover:bg-[rgb(240,240,240)]")
            }
        >
            <div
                className={
                    "relative flex rounded-xl" +
                    " " +
                    (type === "icon" ? "bg-[transparent] " : "bg-[rgb(253,253,253)] outline outline-1 outline-[#e0e0e0]")
                }
            >
                <input
                    className={
                        "ms-9 w-3/4 me-3 bg-[transparent] focus:outline-none focus:ring-none focus:border-none placeholder-gray-950 " +
                        (type === "icon" ? "hidden" : "h-7")
                    }
                    type="text"
                    placeholder="Search..."
                    style={{ fontSize: "14px" }}
                    disabled={type === "input-and-icon"}
                />
                <div className={" " + (type === "icon" ? "h-[28px]" : "absolute h-[18px] top-[5px] left-3")}>
                    <img
                        src="/images/search.svg"
                        alt="..."
                        style={{
                            height: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchBox;
