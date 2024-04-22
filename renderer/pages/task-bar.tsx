import SearchBox from "../Components/SearchBox";

function TaskBarPage() {
    return (
        <div className="h-12 w-full bg-white border-b border-[#c4c4c4] flex justify-between">
            <div className="div bg-gray-300 w-full justify-center flex pt-1">
                <SearchBox />
            </div>
            <div className="w-[300px] bg-blue-600"></div>
        </div>
    );
}

export default TaskBarPage;
