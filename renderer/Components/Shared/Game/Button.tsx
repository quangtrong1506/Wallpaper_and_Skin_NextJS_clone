interface _IProps {
    icon?: "back" | "home";
    text?: string;
}
function Button({ text = "Empty" }: _IProps) {
    return (
        <div className="flex items-center relative h-[50px] bg-[rgb(234,233,76)] px-6">
            <div className="h-[14px] w-[14px] -mt-1 me-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
            </div>
            <div className="text text-3xl">{text}</div>
            <div className="absolute h-[calc(100%_+_5px)] w-5 -left-[15px] top-0 rotate-[15deg] rounded-s-lg overflow-hidden">
                <div className="relative h-full w-full">
                    <div className="absolute w-[30px] bg-white h-full"></div>
                    <div className="absolute w-[15px] bg-[rgb(234,233,76)] rounded-s-md h-full left-[3px]"></div>
                </div>
            </div>
            <div className="absolute bg-[#ffffff] w-[5px] h-[1px] top-0 -left-[3px] rotate-[-5deg]"></div>
        </div>
    );
}
export default Button;
