import { useState } from "react";
import ModalUploadVideo from "../../Modal/ModalUploadVideo";

function AddVideo({ setVideos }) {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleClick = () => {
        setIsShowModal(true);
    };
    return (
        <>
            {isShowModal && <ModalUploadVideo setVideos={setVideos} setIsShowModal={setIsShowModal} />}
            <div className="item w-6/12 px-[4px] mb-2">
                <div className="max-w-sm rounded overflow-hidden relative group ">
                    <div className="w-full flex justify-center items-center" style={{ height: "calc(100vw / 12)" }}>
                        <button onClick={handleClick}>
                            <svg className="w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="black">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddVideo;
