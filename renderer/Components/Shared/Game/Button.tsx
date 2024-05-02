interface _IProps {
    icon?: 'back' | 'home';
    text?: string;
}
function Button({ text = 'Empty' }: _IProps) {
    return (
        <div className="relative h-[50px] min-w-[90px]">
            <div className="bg-[rgb(234,233,76)] w-full h-full rounded-xl -skew-x-12"></div>
            <div className="absolute text-white top-1/2 -translate-y-2/4 w-full flex items-center justify-center">
                <div></div>
                <div className="whitespace-nowrap">{text} aa aa aa aa</div>
            </div>
        </div>
    );
}
export default Button;
