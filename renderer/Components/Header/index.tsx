import Time from "./Time/Time";

function Header() {
    return (
        <div className="fixed z-50 w-4/12 right-0 top-0 select-none h-12 justify-end items-center content-center align-middle flex">
            <div className="flex justify-end">
                <div className="me-2">
                    <Time />
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Header;
