const { addTextWatermark } = require('./watermark')

var options = {
    text: '@what-we-should-put-max-len-please.lazi',
    dstPath: 'watermark.jpg',
}

addTextWatermark('lazi.jpeg', options)
