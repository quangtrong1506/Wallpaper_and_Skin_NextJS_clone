interface _iMenuShortcuts {
    create_new: string;
    hidden_shortcut: string;
}
interface _IMenu {
    play: string;
    pause: string;
    change_video: string;
    languages: string;
    settings: string;
    view: string;
    create_shortcut: string;
    sort_by_grid: string;
    hidden_shortcut: string;
}
interface _IMenuLanguages {
    vi: string;
    en: string;
}
interface _iButtonSpecial {
    download_form_youtube: string;
    upload_file: string;
}
interface _IButton {
    save: string;
    delete: string;
    cancel: string;
    reset: string;
    default: string;
    exit: string;
    confirm: string;
    open: string;
    edit: string;
    change: string;
    select: string;
    upload: string;
    special: _iButtonSpecial;
    create: string;
    update: string;
}
interface _ISize {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
}
interface _INotification {
    errors: {
        application_name_cannot_be_empty: string;
        application_path_cannot_be_empty: string;
        max_length: string;
        min_length: string;
        video_not_found: string;
        no_internet: string;
    };
    success: {
        upload_video_completed: string;
    };
}

interface _ITitle {
    add_new_video: string;
    question_delete_video: string;
    loading_save_image: string;
    loading_save_video: string;
    please_wait: string;
}
interface _ITooltip {
    upload_file: string;
    paste_link_here: string;
}
interface _IFormShortcut {
    title: {
        edit_shortcut: string;
        add_new_shortcut: string;
    };
    label: {
        app_name: string;
        app_path: string;
    };
}
export interface ILanguage {
    menu: _IMenu;
    menu_language: _IMenuLanguages;
    button: _IButton;
    notification: _INotification;
    size: _ISize;
    title: _ITitle;
    tooltip: _ITooltip;
    form_shortcut: _IFormShortcut;
}
