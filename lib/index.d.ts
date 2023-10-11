export interface magnifyImgParams {
    src: string;
    zoom?: number;
    target: HTMLElement;
    width?: string | number;
    MagnifyDomWidth?: number;
    MagnifyDomStyles?: partialCSSStyleDeclaration;
    MagnifyDom?: HTMLElement | IHTMLElement;
    overflow?: Boolean;
}
export type partialCSSStyleDeclaration = Partial<CSSStyleDeclaration>;
interface IHTMLElement extends HTMLElement {
    move?: Function;
}
export declare const magnifyImg: (magnifyImgParams: magnifyImgParams) => void;
export default magnifyImg;
