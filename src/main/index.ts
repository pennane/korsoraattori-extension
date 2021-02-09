import { appendWords, textTransformations } from './constants'
import { getPosition, parseTextTransformations, createImage, createImageWrapper, randomFromArray } from './utils'

const parsedTextTransformations = parseTextTransformations(textTransformations)

let imageIndex = 1

const appendImages = (): void => {
    let pageImages = document.getElementsByTagName('img')
    Array.from(pageImages).forEach((currentImage) => {
        let currentPosition = getPosition(currentImage)

        if (currentPosition.top == 0 || currentPosition.left == 0) return
        if (currentImage.width < 100 || currentImage.src.match(/data/)) return

        if (document.getElementById(`korso${currentImage.id}`)) return

        let newImage = createImage(currentImage)
        let imageWrapper = createImageWrapper(currentPosition, currentImage, imageIndex)

        imageWrapper.appendChild(newImage)
        document.body.appendChild(imageWrapper)
    })
}

const transformText = () => {
    if (/korsoraattori/.test(location.hostname)) return

    let nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT)
    let currentNode
    while ((currentNode = nodeIterator.nextNode())) {
        let textContent = currentNode.textContent
        if (!textContent) return

        if (/vittu/.test(textContent)) continue

        let words: string[] = textContent.split(' ')
        let output = ''

        if (textContent.length > 30 && words.length > 2 && /\S/.test(textContent)) {
            words.forEach((word: string) => {
                output += word + ' '
                if (word.length > 0 && Math.random() > 0.8) {
                    output += randomFromArray(appendWords) + ' '
                }
            })
            parsedTextTransformations.forEach(function (transformation) {
                output = output.replace(transformation[0], transformation[1])
            })
            if (Math.random() > 0.7) {
                output += ' xD! '
            }
            currentNode.textContent = output
        }
        if (words.length == 1 && Math.random() > 0.5 && /^[a-z%C3%A4%C3%B6]+$/i.test(textContent)) {
            currentNode.textContent = 'Vitun ' + currentNode.textContent
        }
    }
}

let _korsoLocation = window.innerHeight

const handleScroll = (): void => {
    appendImages()
    let scrolledOverOldContent =
        document.body.scrollTop > _korsoLocation + window.innerHeight ||
        document.documentElement.scrollTop > _korsoLocation + window.innerHeight

    if (scrolledOverOldContent) {
        _korsoLocation = document.documentElement.scrollTop
        transformText()
    }
}

export const main = () => {
    transformText()
    appendImages()
    document.removeEventListener('scroll', handleScroll)
    document.addEventListener('scroll', handleScroll)
}

main()
