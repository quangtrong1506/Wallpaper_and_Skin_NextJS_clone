import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SIZE } from '../../helpers/constant';
import { sortShortcuts } from '../../helpers/shortcuts';
import { setInitShortcut } from '../../redux/features/shortcut';
import { useAppSelector } from '../../redux/store';
import Shortcut from './Shortcut';
function Shortcuts({ setMenu, menuIsShow }) {
    const disPatch = useDispatch();
    const SHORTCUTS = useAppSelector((state) => state.shortcutsReducer);
    const PATH = useAppSelector((state) => state.pathReducer);
    useEffect(() => {
        function updateSize() {
            disPatch(setInitShortcut(sortShortcuts(SHORTCUTS)?.shortcuts));
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div id="shortcut-container" className="fixed">
            <div className="flex flex-col content-start flex-start flex-wrap">
                {PATH.userPath &&
                    !SHORTCUTS.isHidden &&
                    SHORTCUTS?.items?.map((shortcut) => <Shortcut data={shortcut} key={Math.random() * 100} shortcuts={SHORTCUTS} rootPath={PATH} setMenu={setMenu} menuShow={menuIsShow} />)}
                <div id="dash-shortcut" className={`absolute  bg-white h-[2px] hidden -top-2`} style={{ width: SIZE[SHORTCUTS.size].value.toString() + 'px' }}></div>
            </div>
        </div>
    );
}

export default Shortcuts;
