import { createContext, useContext } from "react";

export const ProjectContext = createContext( null );
export const ModalContext = createContext( null );
export const SearchContext = createContext( null );

export function useProjectContext() {
    return useContext(ProjectContext);
}

export function useModalContext() {
    return useContext(ModalContext);
}

export function useSearchContext() {
    return useContext(SearchContext);
}