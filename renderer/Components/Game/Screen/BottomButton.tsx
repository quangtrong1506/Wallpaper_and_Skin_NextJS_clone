export default function BottomButton({ text, icon = 0 }: { text: string; icon: 0 | 1 }) {
    return (
        <div className="relative w-[300px] h-[84px] bg-[rgba(0,0,0,0.2)] select-none">
            <div className="absolute h-[60px] w-[290px] top-[15px] left-[5px] box-border border-b-4 border-[#34d6ff] bg-gradient-to-t from-[#34d6ff6a] to-transparent"></div>
            <div className="absolute flex items-center h-full w-[48px] left-[22px] ">
                {icon === 0 && (
                    <svg className="w-full -mt-[10px]" fill="#ffffffd0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                        <path
                            className="cls-1"
                            d="M257,47L53,167,52,375,257,490,462,375l-1-209Zm0,47-51,62,51,51,51-51Zm148,88H329L280,361l8,23,30-32,24,20,19-21-27-33,18-21h42V257H364V224h41V182Zm-220,0H109v42h41v33H120v40h42l18,21-27,33,19,21,24-20,30,33,9-24Z"
                        ></path>
                    </svg>
                )}
                {icon === 1 && (
                    <svg className="w-full -mt-[10px]" fill="#ffffffd0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494 317">
                        <path
                            className="cls-1"
                            d="M343,292q-1-9.5-2-19c9-6,17-12,26-18,0-.333,2-1.667,2-2-0.667,0-2.333,1-3,1-4.816,3.164-23.231,5.168-30,6-3.536-5.527-8.382-8.451-16-10-0.53,6.662-3.386,34.808-7,37-5.978-4.627-16.105-4.445-24-7-11.334-3.668-25.322-9.592-37-12-5.723-1.18-12.87,3.65-17,5q-25.086,8.2-50,14c-0.221-6.536-3.537-35-7-37l-8,3c-3.687,2.454-3.361,5.828-9,7-6.489-4.236-21.087-4.366-29-6v1h1c6.4,6.2,25.4,12.777,26,23-1.8,2.755-1.916,10.092-2,14-27.208-3.694-57.655-3.007-70,16H86v-1c-4.427-2.834-6.075-7.958-10-11-9.934-7.7-20.027-15.321-31-22-6.1-3.714-23.907-7.633-27-13,13.553-6.594,26.352-16.584,39-25,4.838-3.219,8.937-7.953,15-10,6.866,6.32,23.07,10.359,35,8v-3L97,202c-6.234-2.836-13.509-4.01-23-4v-1h1c16.928-17.51,27.455-19.635,23-54,6.261-4.466,11.468-14.936,15-22h-2c-4.872-3.342-11.215.861-15,2-2.628-9.81-12.39-19.93-20-25-3.777-2.516-8.815-2.873-11-7,11.265-2.712,22.424-7.974,34-11,30.49-7.97,61.871,1.558,80,15,4.108,3.046,6.463,8.329,10,12-0.4,13.281-8.823,26.541,4,31a11.725,11.725,0,0,0,5,2c6.247-9.832,12.565-18.619,16-32q1-14.5,2-29c4.31-19.712,2.1-44.459,6-63,13.771-8.792,35.8-6.667,53-3,11.69,19.487,3.254,53.1,9,79q2,12,4,24c3.137,9.435,9.079,16.57,14,24,1.754-.631.971-0.193,2-1,4.264-.981,6.931-2.837,9-6,5.3-7.644-6.4-20.316,0-30,3.66-5.536,10.173-8.4,16-12,22.723-14.02,49.721-17.256,80-8,7.868,2.405,22.5,3.382,26,10-9.561,2.509-19.836,10.848-25,18-2.821,3.907-3.626,9.683-8,12-3.393-3.616-9.361-3.282-15-2,1.59,2.66,3.224,5.215,4.973,7.772A151.087,151.087,0,0,0,403,143a41.784,41.784,0,0,0,24,53l-3,1c-4.3-.2-7.708-0.657-11,0-3.421.683-6.515,1.539-9,4a102.677,102.677,0,0,0-11,33h2c7.712,5.172,28.669-6.178,35-8,4.372,5.459,12.066,8.052,18,12,11.142,7.412,21.776,16.767,34,23v2c-20.449,2.717-58.6,30.444-68,45h-1v-1C388.283,290.631,381.007,287.447,343,292ZM250,109c-5.647.95-13.361,1.889-17,5-9.825,8.4-18.5,19.328-15,34,1.754,2.934,6.789,5.675,9.715,6.937,13.072,5.639,22.16,8.552,42.285,1.063,5.888-2.191,10.479-2.647,13-8,4.431-5.564,1.328-13.508-1-18C275.465,117.389,269.477,108.567,250,109ZM146,141l-22,5c-3.133,6.167-3.026,9.836,0,16,18.207,2.4,40.257,6.485,57-1,0.684-4.734,1.789-9.534-1-13C173.168,141.821,158.739,140.939,146,141Zm194,0c-9.784,1.123-14.7,1.127-19,6-2.651,3.1-2.6,9.9,0,13,7.464,6.763,48.133,6.209,56,0,2.441-2.48,1.984-3.9,2-9-0.294-3.514-.895-4.42-4-6C365.062,140.249,351.792,140.952,340,141Zm-94,52c-2.683,1.618-6.525.857-10,2-10.948,3.6-21.215,8.831-21,24,14.636,17.867,34.068,27.4,57,12,3.753-2.521,9.89-5.078,12-9C294.213,203.016,261.657,192.765,246,193Z"
                        />
                    </svg>
                )}
            </div>
            <div className="absolute noto-sans-bold text-white right-5 top-[20px] text-[24px]">{text}</div>
            <div className="absolute h-[2px] w-[244px] bg-[rgba(255,255,255,0.6)] -left-[2px] -top-[4px]"></div>
            <div className="absolute h-[2px] w-[20px] bg-[rgba(255,255,255,0.6)] -right-[2px] -top-[4px]"></div>
            <div className="absolute h-[6px] w-[36px] bg-[#34d6ff] right-[20px] -top-[6px]"></div>
            <div className="absolute h-[2px] w-[calc(100%_+_2px)] bg-[rgba(255,255,255,0.6)] -left-[2px] bottom-[2px]"></div>
            <div className="absolute w-[2px] h-[82px] bg-[rgba(255,255,255,0.6)] -left-[2px] -top-[2px]"></div>
            <div className="absolute w-[2px] h-[84px] bg-[rgba(255,255,255,0.6)] -right-[2px] top-[-2px]"></div>
        </div>
    );
}
