import { ElementRect } from "runed";

function useDocumentHeight() {
    const documentRect = new ElementRect(() => document.documentElement);
    return {
        get current() {
            return  documentRect.current.height
        }
    };
}

export { useDocumentHeight };