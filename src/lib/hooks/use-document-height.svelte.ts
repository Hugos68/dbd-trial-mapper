import { ElementRect } from "runed";

function useDocumentHeight() {
    const documentRect = new ElementRect(() => document.documentElement);
    const height = $derived({ 
        current: documentRect.height
    });
    $inspect(height.current);
    return height;
}

export { useDocumentHeight };