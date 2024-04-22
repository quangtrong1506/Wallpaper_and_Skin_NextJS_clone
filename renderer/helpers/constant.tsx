import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IBackground, IShortcuts } from "./interface";

const SIZE = {
    sm: {
        label: "Small",
        value: 75,
        fontSize: 12,
    },
    md: {
        label: "Medium",
        value: 100,
        fontSize: 14,
    },
    lg: {
        label: "Large",
        value: 125,
        fontSize: 16,
    },
    xl: {
        label: "Extra Large",
        value: 150,
        fontSize: 18,
    },
    xxl: {
        label: "Extra Extra Large",
        value: 175,
        fontSize: 22,
    },
};

const SHORTCUT_SORT_BY = {
    AZ: { label: "A-Z" },
    ZA: { label: "Z-A" },
    Custom: { label: "Custom" },
};
const PATH = {
    video: "/videos/bg-default.mp4",
    image: "/images/logo.png",
    absoluteImageShortcut: "/assets/images",
    absoluteVideoBackground: "/assets/videos",
};
export const initialBackground: IBackground = {
    isLoading: true,
    url: PATH.video,
    isPlay: true,
    id: "0",
};
export const initialShortcuts: IShortcuts = {
    items: [],
    size: "sm",
    short_by: "AZ",
    short_by_grid: true,
};
const Swal = withReactContent(Swal2);
export { PATH, SHORTCUT_SORT_BY, SIZE, Swal };
