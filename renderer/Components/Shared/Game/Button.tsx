interface _IProps {
    type?: 'back' | 'home';
    scale?: number;
}
function Button({ scale = 1, type }: _IProps) {
    return (
        <div className="relative h-[50px] min-w-[110px] select-none">
            <div className="bg-[rgb(234,233,76)] w-full h-full rounded-xl skew-x-[-15deg] border-x-[6px] border-white"></div>
            <div className="absolute text-[black] top-1/2 -translate-y-2/4 w-full flex items-center justify-center">
                <div className="w-[10px] mt-[2px] me-2">
                    <svg className="w-full " fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                    </svg>
                </div>
                <div className="whitespace-nowrap font-bold text-xl">{type === 'back' ? 'Back' : type === 'home' ? 'Home' : 'Empty'}</div>
            </div>
        </div>
    );
}
export default Button;
