const KrakenClient = require('kraken-api')
const { openOrders, cancelOrder } = require('./ordersAPI')
const { mockOpenOrders } = require('../testFixtures/mockOpenOrders')

// { error: [], result: { count: 1 } }

jest.mock('kraken-api', () => jest.fn())
const fakeKraken = { api: jest.fn() }
KrakenClient.mockImplementation(() => fakeKraken)

describe('openOrders', () => {
  const apiResponse = mockOpenOrders.result
  const received = Object.keys(apiResponse.open)
  const testObj = {
    id: received[0],
    opentm: apiResponse.open[received[0]].opentm,
    vol: apiResponse.open[received[0]].vol,
    price: apiResponse.open[received[0]].descr.price,
    pair: apiResponse.open[received[0]].descr.pair,
    type: apiResponse.open[received[0]].descr.type
  }
  test('calls OpenOrders', () => {
    fakeKraken.api.mockImplementation(() => Promise.resolve({ result: apiResponse }))
    return openOrders()
      .then(actual => {
        expect.assertions(4)
        expect(typeof actual).toEqual('object')
        expect(actual).toHaveLength(received.length)
        expect(actual[0].id).toEqual(received[0])
        expect(testObj).toMatchObject(actual[0])
        return null
      })
  })
})

describe('cancelOrder', () => {
  const fakeResponse = { error: [], result: { count: 1 } }
  const fakeResResult = { count: 1 }
  test('calls cancelOrder with txid', () => {
    fakeKraken.api.mockImplementation(() => Promise.resolve(fakeResponse))
    return cancelOrder('abc123')
      .then(res => {
        expect.assertions(4)
        expect(typeof res).toEqual('object')
        expect(res).toEqual(fakeResponse)
        expect(res.result).toEqual(fakeResResult)
        expect(res.result.count).toEqual(1)
        return null
      })
  })
