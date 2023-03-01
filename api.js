// dependencies
const fs = require('fs')
const express = require('express')
const router = express.Router()

const { getContractNft } = require('./smart-contracts-config')

router.get('/', async (req, res) => {
  res.send({ message: 'Assalamo Alaikum' })
})

router.get('/metadata/:tokenId', async (req, res) => {
  try {
    const tokenId = Number(req.params.tokenId)
    const domainName = await getContractNft()
      .methods.domainNameOf(tokenId - 1)
      .call()
    const metadata = {
      name: domainName,
      image: `https://localhost:4000/api/images/${domainName}`,
    }
    res.send(metadata)
  } catch (error) {
    res.send({})
    return
  }
})

router.get('/images/:domainName', async (req, res) => {
  req.params.domainName
  res.sendFile(imagePath)
})

module.exports = router
