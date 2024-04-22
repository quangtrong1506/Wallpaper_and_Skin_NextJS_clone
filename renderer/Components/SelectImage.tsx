import { memo, useEffect, useState } from "react";
import { ILanguage } from "../languages/interface";
import { useAppSelector } from "../redux/store";
import LoadingText from "./LoadingText";

const LIMIT = 25;
function SelectImage({
    setImageSelect,
    setIsShow,
}: {
    setImageSelect?: (string) => void;
    TEXT?: ILanguage;
    setIsShow?: (boolean) => void;
}) {
    const _PATH = useAppSelector((state) => state.pathReducer);
    const [page, setPage] = useState<number>(0);
    const [images, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMax, setIsMax] = useState(false);
    useEffect(() => {
        if (_PATH.images.length > 0) {
            console.log(_PATH.images);
            setImage(
                [..._PATH.images].map((image) => ({
                    url: "/images/shortcuts/" + image,
                }))
            );
        }
    }, [_PATH.images]);
    useEffect(() => {
        if (page > 0) {
            setIsLoading(true);
            fetch(`https://wallpaper-and-skin-image-backend.vercel.app/images?limit=${LIMIT}&page=${page}&sort=1`, {
                method: "GET",
                redirect: "follow",
            })
                .then((response) => response.json())
                .then((result) => {
                    setImage((prev) => [...prev, ...result.data.data]);
                    setIsLoading(false);
                    if (result.data.total < (page + 1) * LIMIT) setIsMax(true);
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
    }, [page]);

    return (
        <>
            <div
                onClick={() => {
                    setIsShow && setIsShow(false);
                }}
                className="z-[1000] flex fixed top-0 left-0 right-0 bottom-0 bg-gray-950 bg-opacity-80 justify-center items-center select-none"
            ></div>
            <div
                className="fixed z-[1005] top-0 left-0 right-0 bottom-0 w-[660px] h-[420px] bg-white rounded-lg p-5"
                style={{ margin: "0 auto", top: "calc((100vh - 420px) / 2)" }}
            >
                <div className="max-h-[380px] w-full overflow-x-hidden overflow-y-auto flex flex-wrap items-start content-start">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="w-[80px] h-[80px] m-1 border overflow-hidden flex justify-center align-middle items-center hover:bg-gray-200 rounded select-none"
                            onClick={() => {
                                setImageSelect && setImageSelect(image.url);
                                setIsShow && setIsShow(false);
                            }}
                        >
                            <img draggable={false} className="w-full  select-none" src={image.url} alt="..." />
                        </div>
                    ))}
                    {!isLoading && !isMax && (
                        <div className="w-[80px] h-[80px] m-1  overflow-hidden flex justify-center align-middle items-center ">
                            <button
                                onClick={() => {
                                    setPage((prev) => prev + 1);
                                }}
                                className="text-[#164863] hover:text-[#2D9596]"
                            >
                                See more
                            </button>
                        </div>
                    )}
                    {isLoading && (
                        <div className="w-[80px] h-[80px] m-1  overflow-hidden flex justify-center align-middle items-center ">
                            <LoadingText />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default memo(SelectImage);
