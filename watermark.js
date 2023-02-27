const Jimp = require('jimp')

const defaultOptions = {
    ratio: 0.6,
    opacity: 0.6,
    dstPath: './watermark.jpg',
    text: 'jimp-watermark',
    textSize: 1,
}

const SizeEnum = Object.freeze({
    1: Jimp.FONT_SANS_8_BLACK,
    2: Jimp.FONT_SANS_10_BLACK,
    3: Jimp.FONT_SANS_12_BLACK,
    4: Jimp.FONT_SANS_14_BLACK,
    5: Jimp.FONT_SANS_16_BLACK,
    6: Jimp.FONT_SANS_32_BLACK,
    7: Jimp.FONT_SANS_64_BLACK,
    8: Jimp.FONT_SANS_128_BLACK,
})
const ErrorTextSize = new Error('Text size must range from 1 - 8')
const ErrorScaleRatio = new Error('Scale Ratio must be less than one!')
const ErrorOpacity = new Error('Opacity must be less than one!')

const checkOptions = (options) => {
    options = { ...defaultOptions, ...options }
    if (options.ratio > 1) {
        throw ErrorScaleRatio
    }
    if (options.opacity > 1) {
        throw ErrorOpacity
    }
    return options
}

/**
 * @param {String} mainImage - Path of the image to be watermarked
 * @param {Object} options
 * @param {String} options.text     - String to be watermarked
 * @param {Number} options.textSize - Text size ranging from 1 to 8
 * @param {String} options.dstPath  - Destination path where image is to be exported
 */
module.exports.addTextWatermark = async (mainImage, options) => {
    try {
        options = checkOptions(options)
        const main = await Jimp.read(mainImage)
        const maxHeight = main.getHeight()
        const maxWidth = main.getWidth()
        if (Object.keys(SizeEnum).includes(String(options.textSize))) {
            const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
            const X = 0, //Always center aligned
                Y = 350
            const finalImage = await main.print(
                font,
                X,
                Y,
                {
                    text: options.text,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                maxWidth,
                maxHeight
            )
            finalImage.quality(100).write(options.dstPath)
            return {
                destinationPath: options.dstPath,
                imageHeight: main.getHeight(),
                imageWidth: main.getWidth(),
            }
        } else {
            throw ErrorTextSize
        }
    } catch (err) {
        throw err
    }
}
