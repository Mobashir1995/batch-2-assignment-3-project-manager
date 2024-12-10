import { useReducer } from "react";
import Sidebar from "../sidebar/sidebar";
import ModalBox from "../tools/modal-box";
import { ToastContainer } from "react-toastify";
import { modalBoxReducer, ProjectReducer, searchBoxReducer } from "../reducers/project-reducers";
import { ProjectItems } from "../data";
import { ModalContext, ProjectContext, SearchContext } from "./project-context";

export function ContextProvider({ children } ) {

    const [ items, dispatchProject ] = useReducer( ProjectReducer, ProjectItems );
    const [ data, modalDispatch ] = useReducer( modalBoxReducer, {open: false, isNew: true, editedItem: {}} );
    const [ searchKey, searchDispatch ] = useReducer( searchBoxReducer, '' );

    return (
        <ProjectContext.Provider value={{ items: items, ProjectDispatch: dispatchProject }}>
            <ModalContext.Provider value={{ data: data, modalDispatch: modalDispatch }} >
            <SearchContext.Provider value={{ searchKey: searchKey, searchDispatch: searchDispatch}} >
                <div className="flex h-screen">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden">
                        { children }
                    </main>
                </div>
                <ModalBox />
                <ToastContainer />
            </SearchContext.Provider>
            </ModalContext.Provider>
        </ProjectContext.Provider>
    )
}