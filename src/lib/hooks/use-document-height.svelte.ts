import { ElementRect } from "runed";

function useDocumentHeight() {
    const documentRect = new ElementRect(() => document.documentElement);
    const height = $derived({ 
        current: documentRect.current.height
    });
    return height;
}

export { useDocumentHeight };