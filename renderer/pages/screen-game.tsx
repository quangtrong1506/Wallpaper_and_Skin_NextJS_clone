function ScreenGamePage() {
    return (
        <div className="relative">
            <div className="overflow-hidden h-screen">
                <video muted autoPlay loop src="/videos/bg-default.mp4"></video>
            </div>

            <div className="right"></div>
        </div>
    );
}

export default ScreenGamePage;
