interface magnifyImgParams {
    src: string;
    zoom?: number;
    target: HTMLElement;
    width?: string | number;
    MagnifyDomWidth?: number;
}
export declare const magnifyImg: (magnifyImgParams: magnifyImgParams) => void;
export default magnifyImg;
