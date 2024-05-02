import Button from '../Components/Shared/Game/Button';

export default function NextPage() {
    return (
        <>
            <div>
                {/* <div className="absolute inset-0">
                    <img src="/images/z.png" alt="" />
                </div>
                <div className="absolute top-[89px] left-[205px]">
                    <Shortcut />
                </div> */}

                <div className="absolute top-4 left-20 bg-gray-950  p-10 ">
                    <Button text="Back" />
                </div>
            </div>
        </>
    );
}
