// why are you writing code here? explain from step 1 to end. // convert text to image, adil.lazy to image for opensea nft

import { UltimateTextToImage } from 'ultimate-text-to-image'

const url = 'https://i.imgur.com/EP7lGGu.jpg'
const buffer = new UltimateTextToImage('repeatX').render().toBuffer()
const base64 = new UltimateTextToImage('fitY')
    .render()
    .toBuffer()
    .toString('base64')
const arrayBuffer = new Uint8Array(
    new UltimateTextToImage('repeat').render().toBuffer()
) // images

const canvasImage1 = await getCanvasImage({ url })
const canvasImage2 = await getCanvasImage({ base64 })
const canvasImage3 = await getCanvasImage({ buffer })
const canvasImage4 = await getCanvasImage({ arrayBuffer }) // use various way to draw the image

const textToImage = new UltimateTextToImage('Image Example', {
    width: 600,
    height: 600,
    alignToCenterIfLinesLE: 1,
    fontSize: 72,
    backgroundColor: '#FFFFFF99',
    images: [
        { canvasImage: canvasImage1, layer: -1, repeat: 'fit' },
        {
            canvasImage: canvasImage2,
            layer: 0,
            repeat: 'fitY',
            x: 10,
            y: 10,
            width: 100,
            height: 100,
        },
        {
            canvasImage: canvasImage3,
            layer: 1,
            repeat: 'repeatX',
            sx: -400,
            sy: 100,
            width: 300,
            height: 300,
        },
        {
            canvasImage: canvasImage4,
            layer: 1,
            repeat: 'repeat',
            sx: -200,
            sy: -300,
            tx: -50,
            ty: -50,
        },
    ],
})
    .render()
    .toFile(path.join(__dirname, 'image3.png'))
