import { ILanguage } from './interface';

export const vi: ILanguage = {
    menu: {
        change_video: 'Thay đổi video',
        languages: 'Ngôn ngữ',
        pause: 'Tạm dừng video',
        play: 'Phát video',
        settings: 'Mở cài đặt',
        create_shortcut: 'Tạo lối tắt',
        view: 'Xem',
        hidden_shortcut: 'Ẩn lối tắt',
        sort_by_grid: 'Xếp theo lưới',
    },
    button: {
        cancel: 'Hủy',
        change: 'Thay đổi',
        confirm: 'Xác nhận',
        default: 'Mặc định',
        delete: 'Xóa',
        edit: 'Sửa',
        exit: 'Thoát',
        open: 'Mở',
        reset: 'Reset',
        save: 'Lưu',
        select: 'Chọn',
        upload: 'Tải lên',
        special: {
            download_form_youtube: 'Tải từ youtube',
            upload_file: 'Lựu chọn từ file',
        },
        create: 'Tạo mới',
        update: 'Cập nhật',
    },
    menu_language: {
        en: 'English',
        vi: 'Tiếng Việt',
    },
    notification: {
        errors: {
            application_name_cannot_be_empty: 'Tên ứng dụng không được để trống',
            application_path_cannot_be_empty: 'Đường dẫn ứng dụng không được để trống',
            max_length: 'Tối đa ${1} ký tự',
            min_length: 'Tối thiểu ${1} ký tự',
            video_not_found: 'Video không tồn tại',
            no_internet: 'Không có kết nối internet',
        },
        success: {
            upload_video_completed: 'Tải video lên thành công',
        },
    },
    size: {
        sm: 'Nhỏ',
        md: 'Vừa',
        lg: 'Lớn',
        xl: 'Lớn vừa',
        xxl: 'Lớn cực đại',
    },
    title: {
        add_new_video: 'Thêm video mới',
        question_delete_video: 'Xác nhận xóa video',
        loading_save_image: 'Đang lưu hình ảnh',
        loading_save_video: 'Đang lưu video',
        please_wait: 'Vui lòng đợi!',
    },
    tooltip: {
        upload_file: 'Kéo & Thả File hoặc lựa chọn từ browse',
        paste_link_here: 'Dán đường dẫn vào đây',
    },
    form_shortcut: {
        title: {
            add_new_shortcut: 'Thêm lối tắt mới',
            edit_shortcut: 'Chỉnh sửa lối tắt',
        },
        label: {
            app_name: 'Tên ứng dụng',
            app_path: 'Đường dẫn ứng dụng',
        },
    },
};
