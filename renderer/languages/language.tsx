import { en } from "./en";
import { vi } from "./vi";

export const listOfLanguages = [
    {
        label: "Tiếng Việt",
        code: "vi-VN",
    },
    {
        label: "English",
        code: "en-US",
    },
];

interface IResult {
    code: string;
    texts: object;
}
export const getText: (string) => IResult = (code: string) => {
    let result = {
        texts: null,
        code: code,
    };
    if (code === "vi-VN") {
        result.code = "vi-VN";
        result.texts = vi;
    } else {
        result.code = "en-US";
        result.texts = en;
    }
    return result;
};
