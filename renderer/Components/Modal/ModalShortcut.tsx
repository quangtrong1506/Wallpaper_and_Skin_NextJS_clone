import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PATH } from "../../helpers/constant";
import { DATA } from "../../helpers/data";
import { customId, destroyImage, saveImage } from "../../helpers/helpers";
import { IShortcutItem } from "../../helpers/interface";
import { getImagePath, sortShortcuts } from "../../helpers/shortcuts";
import { setInitShortcut } from "../../redux/features/shortcut";
import { useAppSelector } from "../../redux/store";
import SelectImage from "../SelectImage";

interface _IProps {
    id?: string;
    setIsShow?: (boolean) => void;
}
interface _IImage {
    data: any;
    url: string;
    type: "base64" | "default" | "link" | "no-change";
}
function ModalShortcut({ id, setIsShow }: _IProps) {
    const dispatch = useDispatch();
    const TEXT = useAppSelector((state) => state.languageReducer);
    const SHORTCUTS = useAppSelector((state) => state.shortcutsReducer);
    const _PATH = useAppSelector((state) => state.pathReducer);
    const [isShowSelectImage, setIsShowSelectImage] = useState(false);
    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
    } = useForm({ defaultValues: { title: "", path: "" } });
    const [image, setImage] = useState<_IImage>({
        data: null,
        url: PATH.image,
        type: "default",
    });
    useEffect(() => {
        let item = SHORTCUTS.items.find((item: IShortcutItem) => item.id === id);
        if (item) {
            setValue("title", item.title);
            setValue("path", item.path);
            setImage({ data: null, url: getImagePath(_PATH.userPath, item.iconId), type: "no-change" });
        }
    }, [SHORTCUTS, id]);

    const handleForm = (data) => {
        const customID = customId();
        let shortcuts = { ...SHORTCUTS };
        let items = [...shortcuts.items];
        if (id) {
            let index: number = items.findIndex((item) => item.id === id);
            let item: IShortcutItem = { ...items[index], title: data.title, path: data.path };
            if (image.type != "no-change") {
                destroyImage(item.iconId);
                item.iconId = customID;
                item.base64Icon = image.url;
            }
            items[index] = item;
            shortcuts.items = items;
        } else {
            let item: IShortcutItem = {
                iconId: customID,
                id: customID,
                path: data.path,
                title: data.title,
                base64Icon: image.url,
            };
            items.push(item);
            shortcuts.items = items;
            shortcuts.short_by_grid = true;
        }
        let newS = sortShortcuts(shortcuts).shortcuts;
        DATA.setShortcuts(newS);
        dispatch(setInitShortcut(newS));
        if (image.type !== "no-change") {
            saveImage({ name: customID, url: image.url });
        }
        setIsShow(false);
    };
    return (
        <>
            <div className="flex z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-950 bg-opacity-80 justify-center items-center ">
                <div className="relative w-[600px] -min-h-[300px] bg-white rounded-lg flex flex-wrap px-3">
                    <div className="w-full text-center text-3xl font-bold mt-3">
                        {id ? TEXT.form_shortcut.title.edit_shortcut : TEXT.form_shortcut.title.add_new_shortcut}
                    </div>
                    <div className="w-4/12 relative group">
                        <div className="group-hover:blur-sm w-full justify-center flex ">
                            <div className="w-11/12 overflow-hidden flex items-center content-center border h-[180px]">
                                <img className="w-full" src={image.url} alt={image.url} />
                            </div>
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-[180px] z-10 hidden justify-center items-center group-hover:flex flex-col">
                            <button className="bg-[#67ad9f] text-white min-w-20 rounded-md px-3 py-1 mb-1  outline outline-1 outline-[#ffffff]">
                                <label className="cursor-pointer" htmlFor="icon-upload">
                                    {TEXT.button.upload}
                                </label>
                                <input
                                    className="hidden"
                                    id="icon-upload"
                                    type="file"
                                    accept=".png, .jpg, .jpeg .ico"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            setImage({
                                                url: URL.createObjectURL(e.target.files[0]),
                                                data: e.target.files[0],
                                                type: "base64",
                                            });
                                        }
                                    }}
                                />
                            </button>
                            <button
                                className="bg-[#ffffff] text-[#67ad9f] min-w-20 rounded-md px-3 py-1 outline outline-1 outline-[#67ad9f]"
                                onClick={() => setIsShowSelectImage(true)}
                            >
                                {TEXT.button.select}
                            </button>
                        </div>
                    </div>
                    <div className="w-7/12 ms-4">
                        <form onSubmit={handleSubmit(handleForm)}>
                            <div>
                                <label className="mb-2 inline-block min-w-20 text-lg">{TEXT.form_shortcut.label.app_name}</label>
                                <input
                                    type="text"
                                    className={
                                        "w-full text-xl p-1 border border-gray-300 rounded  focus:outline-[#000000] focus:outline-1" +
                                        (errors.title ? "border border-[red] focus:outline-[red]" : "")
                                    }
                                    placeholder="Hello world"
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: TEXT.notification.errors.application_name_cannot_be_empty,
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: TEXT.notification.errors.max_length.replace("${1}", "100"),
                                        },
                                        minLength: {
                                            value: 3,
                                            message: TEXT.notification.errors.min_length.replace("${1}", "3"),
                                        },
                                    })}
                                />
                                {errors.title && <p className="text-sm text-[red] text-i">{errors.title.message.toString()}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="mb-2 inline-block min-w-20xl">{TEXT.form_shortcut.label.app_path}</label>
                                <input
                                    type="text"
                                    className={
                                        "w-full text-xl p-1 border border-gray-300 rounded  focus:outline-[#000000] focus:outline-1" +
                                        (errors.path ? "border border-[red] focus:outline-[red]" : "")
                                    }
                                    placeholder="D://myapp.exe"
                                    {...register("path", {
                                        required: {
                                            value: true,
                                            message: TEXT.notification.errors.application_name_cannot_be_empty,
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: TEXT.notification.errors.max_length.replace("${1}", "100"),
                                        },
                                    })}
                                />
                                {errors.path && <p className="text-sm text-[red] text-i">{errors.path.message.toString()}</p>}
                                <div className="w-full text-center mt-5">
                                    <button
                                        type="submit"
                                        className="mx-2 bg-[#007F73] text-white px-3 py-1 text-lg rounded-md focus:outline-[#000000] focus:outline-1"
                                    >
                                        {id ? TEXT.button.update : TEXT.button.create}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsShow && setIsShow(false);
                                        }}
                                        type="button"
                                        className="mx-2 bg-[#FF004D] text-white px-3 py-1 text-lg rounded-md  focus:outline-[#000000] focus:outline-1"
                                    >
                                        {TEXT.button.cancel}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-full pb-5"></div>
                </div>
            </div>
            {isShowSelectImage && (
                <SelectImage
                    setImageSelect={(url) => {
                        setImage({ data: null, url, type: "link" });
                    }}
                    setIsShow={setIsShowSelectImage}
                />
            )}
        </>
    );
}

export default ModalShortcut;
