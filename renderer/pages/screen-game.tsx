import Valkyrie from "../Components/Game/Valkyrie";

function ScreenGamePage() {
    return (
        <div className="relative">
            <div className="overflow-hidden h-screen">
                <video muted autoPlay loop src="/videos/bg-default.mp4"></video>
            </div>
            <div className="absolute top-0 left-0 w"></div>
            <div className="absolute bottom-10 left-10 w-60">
                <Valkyrie />
            </div>
        </div>
    );
}

export default ScreenGamePage;
