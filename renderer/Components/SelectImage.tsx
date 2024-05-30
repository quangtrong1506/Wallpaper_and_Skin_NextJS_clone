import { memo, useEffect, useState } from 'react';
import { ILanguage } from '../languages/interface';
import { useAppSelector } from '../redux/store';
import LoadingText from './LoadingText';

const LIMIT = 25;
function SelectImage({ setImageSelect, setIsShow }: { setImageSelect?: ({ type, url }: { url: string; type: 'link' | 'file' }) => void; TEXT?: ILanguage; setIsShow?: (boolean) => void }) {
    const _PATH = useAppSelector((state) => state.pathReducer);
    const [page, setPage] = useState<number>(0);
    const [images, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMax, setIsMax] = useState(false);
    useEffect(() => {
        if (_PATH.images.length > 0) {
            setImage(
                [..._PATH.images].map((image) => ({
                    url: '/images/shortcuts/' + image,
                }))
            );
        }
    }, [_PATH.images]);
    useEffect(() => {
        if (page > 0) {
            setIsLoading(true);
            fetch(`https://wallpaper-and-skin-image-backend.vercel.app/images?limit=${LIMIT}&page=${page}&sort=1`, {
                method: 'GET',
                redirect: 'follow',
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
                className="fixed z-[1005] left-0 right-0 bottom-0 w-[600px] lg:w-[800px] xl:w-[1000px] h-[420px]  top-[calc((100vh_-_420px)_/_2)] lg:h-[540px]  lg:top-[calc((100vh_-_540px)_/_2)] xl:h-[660px]  xl:top-[calc((100vh_-_660px)_/_2)] bg-white rounded-lg p-5"
                style={{ margin: '0 auto' }}
            >
                <div className="max-h-[380px] lg:max-h-[450px] xl:max-h-[620px] w-full overflow-x-hidden overflow-y-auto flex flex-wrap items-start content-start">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="w-[80px] h-[80px] lg:w-[118px] lg:h-[118px] xl:w-[150px]
                            xl:h-[150px] m-1 border overflow-hidden flex justify-center align-middle items-center hover:bg-gray-200 rounded select-none"
                            onClick={() => {
                                setImageSelect?.({ url: image.url, type: image.url.match('http') ? 'link' : 'file' });
                                setIsShow && setIsShow(false);
                            }}
                        >
                            <img draggable={false} className="w-full h-full object-contain  select-none" src={image.url} alt="..." />
                        </div>
                    ))}
                    {!isLoading && !isMax && (
                        <div className="w-[80px] h-[80px] lg:w-[118px] lg:h-[118px] xl:w-[150px] xl:h-[150px]  text-base lg:text-xl m-1  overflow-hidden flex justify-center align-middle items-center ">
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
                        <div className="w-[80px] h-[80px] lg:w-[118px] lg:h-[118px] xl:w-[150px] xl:h-[150px]  text-base lg:text-xl m-1  overflow-hidden flex justify-center align-middle items-center ">
                            <LoadingText />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default memo(SelectImage);
