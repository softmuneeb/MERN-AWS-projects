// dependencies
const fs = require('fs')
const express = require('express')
const router = express.Router()

const { getContractNft } = require('./smart-contracts-config')

router.get('/', async (req, res) => {
  res.send({ message: 'Assalamo Alaikum' })
})

router.get('/metadata/:tokenId', async (req, res) => {
  const tokenId = Number(req.params.tokenId)
  let domainName
  try {
    domainName = await getContractNft()
      .methods.domainNameOf(tokenId - 1)
      .call()
  } catch (e) {
    res.send({})
    return
  }

  const metadata = {
    name: domainName,
    image: `https://localhost:4000/api/images/${domainName}`,
  }
  res.send(metadata)
})

router.get('/images/:tokenId', async (req, res) => {
  const totalSupply = await getContractNft().methods.totalSupply().call()

  if (Number(req.params.tokenId) < Number(totalSupply)) {
    const imagePath = __dirname + '/images/' + req.params.tokenId + '.jpg'
    res.sendFile(imagePath)
  } else {
    const imagePath = __dirname + '/images/pre_reveal.jpeg'
    res.sendFile(imagePath)
  }
})

module.exports = router
