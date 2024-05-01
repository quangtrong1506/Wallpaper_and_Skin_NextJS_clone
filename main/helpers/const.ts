export type ITypeOfScreen = 'default' | 'game';
interface _ISettings {
    only_screen?: {
        index: 0 | 1;
    };
    screen_1: {
        is_show?: boolean;
        index?: 0 | 1;
        type?: string;
    };
    screen_2: {
        is_show?: boolean;
    };
}

const USER_SETTINGS: _ISettings = {
    only_screen: {
        index: 0,
    },
    screen_1: { is_show: true, index: 0 },
    screen_2: { is_show: true },
};

// export { USER_SETTINGS };
