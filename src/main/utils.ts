import { images, version } from './constants'
import { Position, TextTransformation } from './types'

export const randomFromArray = (arr: Array<any>): any => arr[Math.floor(Math.random() * arr.length)]

export const getImageWrapperStyle = (currentPosition: Position, currentImage: HTMLImageElement): any => {
    return {
        transform: 'rotate(' + Math.floor(Math.random() * 45 - 22) + 'deg)',
        position: 'absolute',
        top: currentPosition.top + (currentImage.height / 2) * Math.random() + 'px',
        left: currentPosition.left + (currentImage.width / 2) * Math.random() + 'px',
        zIndex: '65535'
    }
}

export const getImageStyle = (): any => {
    return {
        filter: 'hue-rotate(' + Math.random() + 'turn)',
        zIndex: '65535'
    }
}

export const getKorsoVersionStyle = (): any => {
    return {
        position: 'fixed',
        top: '1px',
        left: '1px',
        zIndex: '65535',
        fontSize: '10px'
    }
}

export const createImageWrapper = (
    currentPosition: Position,
    currentImage: HTMLImageElement,
    imageIndex: number
): HTMLDivElement => {
    let imageWrapper = document.createElement('div')
    imageWrapper.id = 'korso' + currentImage.id
    if (imageWrapper.id === 'korso') {
        currentImage.id = 'i' + imageIndex++
        imageWrapper.id = 'korso' + currentImage.id
    }
    let imageWrapperStyle = getImageWrapperStyle(currentPosition, currentImage)
    Object.keys(imageWrapperStyle).forEach((stylePart) => {
        imageWrapper.style[stylePart as any] = imageWrapperStyle[stylePart]
    })
    return imageWrapper
}

export const createImage = (currentImage: HTMLImageElement): HTMLImageElement => {
    let newImage = document.createElement('img')

    newImage.src = randomFromArray(images)
    newImage.width = currentImage.width * Math.random()
    newImage.height = currentImage.height * Math.random()

    let imageStyle = getImageStyle()
    Object.keys(imageStyle).forEach((stylePart) => {
        newImage.style[stylePart as any] = imageStyle[stylePart]
    })

    return newImage
}

export const createKorsoVersionElement = (): HTMLDivElement => {
    let korsoVersionElement = document.createElement('div')
    korsoVersionElement.id = 'korsover'
    let korsoVersionStyle = getKorsoVersionStyle()
    Object.keys(korsoVersionStyle).forEach((stylePart) => {
        korsoVersionElement.style[stylePart as any] = korsoVersionStyle[stylePart]
    })
    korsoVersionElement.innerHTML = `Korsoraattori ${version}`

    return korsoVersionElement
}

export const getPosition = (el: HTMLElement): Position => {
    let rect: DOMRect = el.getBoundingClientRect()
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export const parseTextTransformations = (textTransformations: any): TextTransformation[] => {
    return textTransformations.map(
        (transformation: string): TextTransformation => {
            let params = transformation.split(',')
            let target: string | RegExp = params[0]
            let output = params[1]
            if (transformation.indexOf('/') === 0) {
                let expression = transformation.split('/')[1]
                expression = expression.concat('([ .:!”,?])')
                target = new RegExp(expression, 'g')
            }
            console.log(target, output)
            return [target, output]
        }
    )
}

export const appendKorsoraattoriVersion = () => {
    if (document.getElementById('korsover')) return
    let korsoVersionElement = createKorsoVersionElement()
    document.body.appendChild(korsoVersionElement)
}
