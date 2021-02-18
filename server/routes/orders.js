const express = require('express')
const { openOrders, cancelOrder } = require('../kraken/ordersAPI')

const router = express.Router()

router.get('/open', (req, res) => {
  openOrders()
    .then((result) => {
      return res.json(result)
    })
    .catch(err => console.log(err))
})

router.post('/cancel/:txid', (req, res) => {
  const { txid } = req.params
  cancelOrder(txid)
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(500).send(error.message()))
})

module.exports = router
