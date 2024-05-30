'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { getMessage } from '../../../helpers/helpers';
import mmd from '../../../helpers/mmd';
import Loading from '../../Loading';

async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
}

function AIChat({ scale }: { scale: number }) {
    const inputRef = useRef<HTMLInputElement>();
    const listChatRef = useRef<HTMLDivElement>();
    const [message, setMessage] = useState<Array<{ role: 0 | 1; content: string }>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, []);
    const handleMessage = async () => {
        run();
        if (inputRef.current.value) {
            let text = inputRef.current.value;
            inputRef.current.value = '';
            setMessage((prev) => [...prev, { role: 0, content: text }]);
            setIsLoading(true);
            let res = await getMessage(text);
            setMessage((prev) => [...prev, { role: 1, content: res }]);
            setIsLoading(false);
            inputRef.current.focus();
        }
    };
    useEffect(() => {
        listChatRef.current.scrollTop = 9999999;
    }, [message]);
    return (
        <div className="relative bg-[rgba(0,0,0,0.4)] w-full h-full ">
            <div className="text-white noto-sans-medium pt-[5px] ms-5" style={{ fontSize: 50 * scale + 'px' }}>
                AI Chat
            </div>
            <div ref={listChatRef} className="absolute  w-[calc(100%_-_5px)] left-[2px] overflow-hidden overflow-y-auto" style={{ maxHeight: 79 + 'vh', top: 96 * scale + 'px' }}>
                <div className="w-full h-5"></div>
                {message.map((ms, i) => (
                    <div key={'ms-' + i}>
                        {ms.role === 0 && (
                            <div className=" px-5 py-2 rounded-xl me-[15px]">
                                <div className="text-[#fff] noto-sans-medium font-bold text-right text-xl">Bạn</div>

                                <div
                                    className="noto-sans-medium bg-gradient-to-l from-[#ceb1ff] to-[#9ffffd] bg-clip-text w-auto max-w-[100%] text-right"
                                    style={{ WebkitTextFillColor: 'transparent' }}
                                >
                                    {ms.content}
                                </div>
                            </div>
                        )}
                        {ms.role === 1 && (
                            <div className=" px-5 py-2 rounded-xl me-[15px]">
                                <div className="text-[#fff] noto-sans-medium font-bold text-xl mb-1">Kết quả</div>
                                <div
                                    className={clsx(
                                        'noto-sans-medium text-[#e7f9ff] bg-[rgb(20,20,20)] w-auto max-w-[95%] p-3 rounded-md [&_strong]:text-[#47b1aa] ',
                                        ' [&_code]:bg-[#29837d] [&_code]:px-2 [&_code]:py-1 [&_code]:rounded',
                                        '[&_p]:my-3 [&_h2]:text-xl'
                                    )}
                                    dangerouslySetInnerHTML={{ __html: mmd(ms.content) }}
                                ></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="absolute w-full" style={{ height: 82 * scale + 'px', bottom: 30 * scale + 'px' }}>
                <div className="relative ms-[30px]" style={{ width: 700 * scale + 'px', height: 82 * scale + 'px' }}>
                    <div className="absolute left-[2%] box-border bg-[rgba(255,255,255,0.2)]" style={{ width: 670 * scale + 'px', bottom: 12 * scale + 'px', height: 60 * scale + 'px' }}></div>

                    <div data-name="text" className="absolute noto-sans-bold text-white right-5 top-[20px] text-[24px]"></div>
                    <div data-name="top-left" className="absolute h-[2px] bg-[rgba(255,255,255,0.6)] -left-[2px]" style={{ width: 593 * scale + 'px', bottom: 82 * scale + 'px' }}></div>
                    <div data-name="top-right" className="absolute h-[2px] bg-[rgba(255,255,255,0.6)] -right-[2px]" style={{ width: 26 * scale + 'px', bottom: 82 * scale + 'px' }}></div>
                    <div data-name="top-center" className="absolute h-[2px] bg-[#34d6ff]" style={{ width: 75 * scale + 'px', right: 29 * scale + 'px', bottom: 82 * scale + 'px' }}></div>
                    <div
                        data-name="bottom"
                        className="absolute w-[calc(100%_+_4px)] h-[2px] bg-[rgba(255,255,255,0.6)] -left-[2px] bottom-[0]"
                        // style={{ width: 706 * scale + 'px' }}
                    ></div>
                    <div data-name="left" className="absolute w-[2px] bg-[rgba(255,255,255,0.6)] -left-[2px] bottom-[2.05px]" style={{ height: 80 * scale + 'px' }}></div>
                    <div data-name="right" className="absolute w-[2px] bg-[rgba(255,255,255,0.6)] -right-[2px] bottom-[2.05px]" style={{ height: 80 * scale + 'px' }}></div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Hỏi tôi bất cứ điều gì?"
                        className="ps-5 noto-sans-regular absolute text-white bg-transparent rounded-md focus-visible:outline-none outline-none"
                        style={{
                            height: 82 * scale + 'px',
                            width: 610 * scale + 'px',
                            fontSize: 36 * scale + 'px',
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleMessage();
                            }
                        }}
                    ></input>
                    <div className="absolute flex items-center h-full right-[30px] bottom-[0]" style={{ width: 50 * scale + 'px' }}>
                        {!isLoading && (
                            <svg className="w-full" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 798 698" onClick={handleMessage}>
                                <path
                                    className="cls-1"
                                    d="M737.105,289L135,29a68.33,68.33,0,0,0-26-4c-12.355.5-26.045,8.123-34,17-8.594,9.591-16.379,25.635-15,39a80.8,80.8,0,0,0,7,25l97,179s7.138,13.968,23,16c65.063,8.334,209.268,25.6,247,31,5.725,0.82,6,9,6,9s-0.229,9.223-5,10c-42.261,6.88-253,32-253,32a25.022,25.022,0,0,0-6,3c-4.356,2.958-9.6,7.854-12,12C141.733,436.511,77.873,559.5,63.084,588.043,74.277,566.44,45.029,610.545,75,641c6.524,6.629,15.094,12.722,24,15,11.616,2.972,30,0,30,0S737,393.8,737,394c0,0.062,15.5-6.584,26-20,7.393-9.447,11-24.709,11-36,0-9.925-6.829-23.726-14-32A65.046,65.046,0,0,0,737.105,289Z"
                                />
                            </svg>
                        )}
                        {isLoading && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIChat;
