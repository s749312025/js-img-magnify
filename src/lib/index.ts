
interface magnifyImgParams {
    src: string;
    zoom?: number;
    target: HTMLElement;
    width?: string | number;
    MagnifyDomWidth?: number;
    MagnifyDomStyles?: partialCSSStyleDeclaration,
    MagnifyDom?: HTMLElement | IHTMLElement,
    overflow?: Boolean
}

type partialCSSStyleDeclaration =  Partial<CSSStyleDeclaration>

interface IHTMLElement extends HTMLElement {
  move?: Function 
}

interface IWindow extends Window {
    magnifyImg?: any
}


export const magnifyImg = (magnifyImgParams: magnifyImgParams) => {

    let setDomStyle = (dom: IHTMLElement | HTMLElement, style: partialCSSStyleDeclaration) => {
        for (const key in style) {
            dom.style[key] = style[key] || ''
        }
    }

    let limiteRange = (value: number | string, min: number | string, max: number | string) => {
        if (value > max) return max
        if (value < min) return min
        return value
    }

    let params = {
        src: magnifyImgParams.src,
        zoom: magnifyImgParams.zoom || 3,
        target:magnifyImgParams.target,
        width: magnifyImgParams.width || 'auto',
        MagnifyDomWidth: magnifyImgParams.MagnifyDomWidth || 200,
        MagnifyDomStyles: magnifyImgParams.MagnifyDomStyles || {},
        overflow: magnifyImgParams.overflow === undefined ? true : magnifyImgParams.overflow
    }

    // container
    const container = document.createElement("div")
    container.style.cssText = `position: relative; width: ${params.width + 'px'};`
    params.target.append(container)

    // img
    let imgWidth = 0;
    let imgHeight = 0;
    const img = new Image()
    // img.crossOrigin = 'anonymous'
    img.src = params.src
    img.style.cssText = 'width: 100%; display: block;'
    container.append(img)

    // scaleContainer
    let scaleX = 0  // mouse to container left
    let scaleY = 0  // mouse to container top
    let MagnifyDomWidth = params.MagnifyDomWidth
    const scaleContainer: IHTMLElement = magnifyImgParams.MagnifyDom || document.createElement("div")
    // scaleContainer set style
    if (magnifyImgParams.MagnifyDom) {
        setDomStyle(scaleContainer, {
            backgroundRepeat: 'no-repeat',
            ...params.MagnifyDomStyles
        })
    } else {
        setDomStyle(scaleContainer, {
            position: 'absolute',
            display: 'none',
            width: MagnifyDomWidth + 'px',
            height: MagnifyDomWidth + 'px',
            boxShadow: 'inset 0 0 30px 3px rgba(0, 0, 0, 0.25)',
            pointerEvents: 'none',
            backgroundImage: `url(${params.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#ffffff',
            ...params.MagnifyDomStyles
        })
    }
    
    container.append(scaleContainer)
    scaleContainer.move = () => {
        // computeScaleContainerDom
        let computeWidth = scaleContainer.getBoundingClientRect().width
        let computeHeight = scaleContainer.getBoundingClientRect().height
        let borderWidth = parseInt(scaleContainer.style.borderWidth) || 0

        // move coordinate && bgImage Position
        let moveX: number|string = scaleX - computeWidth / 2
        let moveY: number|string = scaleY - computeHeight / 2
        let backgroundPositionX: number|string = -(scaleX * params.zoom - computeWidth / 2 + borderWidth)
        let backgroundPositionY: number|string = -(scaleY * params.zoom - computeWidth / 2 + borderWidth)

        // if overflow is true, move & backgroundPosition limite range
        if (params.overflow) {
            moveX = limiteRange(moveX, 0, imgWidth - computeWidth)
            moveY = limiteRange(moveY, 0, imgHeight - computeHeight)
            backgroundPositionX = limiteRange(backgroundPositionX, -imgWidth * params.zoom + computeWidth - borderWidth, 0)            
            backgroundPositionY = limiteRange(backgroundPositionY, -imgHeight * params.zoom + computeHeight - borderWidth, 0)
        }
        
        if (magnifyImgParams.MagnifyDom) {
            setDomStyle(scaleContainer, {
                backgroundPositionX: backgroundPositionX + 'px',
                backgroundPositionY: backgroundPositionY + 'px',
                backgroundSize: `${imgWidth * params.zoom}px ${imgHeight * params.zoom}px`,
            })
        } else {
            setDomStyle(scaleContainer, {
                left: moveX + 'px',
                top: moveY + 'px',
                backgroundPositionX: backgroundPositionX + 'px',
                backgroundPositionY: backgroundPositionY + 'px',
                backgroundSize: `${imgWidth * params.zoom}px ${imgHeight * params.zoom}px`,
            })
        }
    }

    // img onload
    const imgOnLoad = () => {
        imgWidth = img.width
        imgHeight = img.height

        img.addEventListener('mousemove', mouseHandler)
        img.addEventListener('mouseleave', mouseLeave)
        img.addEventListener('mouseover', mouseOver)

    }

    const mouseHandler = (e: MouseEvent) => {
        scaleX = e.pageX - container.offsetLeft;
        scaleY = e.pageY - container.offsetTop;
        scaleContainer.move ? scaleContainer.move() : null
    }

    const mouseLeave = () => {
        if (magnifyImgParams.MagnifyDom) {
            setDomStyle(scaleContainer, {
                backgroundImage: ``,
            })
        } else {
            scaleContainer.style.display = 'none'
        }
    }

    const mouseOver = () => {
        if (magnifyImgParams.MagnifyDom) {
            setDomStyle(scaleContainer, {
                backgroundImage: `url(${params.src})`,
            })
        } else {
            scaleContainer.style.display = 'block'
        }
    }

    img.onload = imgOnLoad
}

export default magnifyImg

let global: IWindow = window
global.magnifyImg = magnifyImg