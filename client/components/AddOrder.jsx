import React, { useState } from 'react'

import { addOrder } from '../apis/index'

const AddOrder = () => {
  const [order, setOrder] = useState({
    pair: 'XXBTZUSD',
    price: '45000',
    type: 'Buy'
  })

  const handleSubmit = e => {
    e.preventDefault()
    addOrder(order)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setOrder({ ...order, [name]: value })
  }

  return (
    <div>
      <h1>Place an order</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pair">Select Pair</label><br/>
        <select name="pair" data-testid="pair" onChange={handleChange}>
          <option value="XXBTZUSD">XXBTZUSD</option>
          <option value="XLTCZUSD">XLTCZUSD</option>
          <option value="XETHZUSD">XETHZUSD</option>
        </select><br/><br/>
        <label htmlFor="price"></label>Price<br/>
        <input
          onChange={handleChange}
          type="range"
          id="price"
          name="price"
          min="45000"
          max="55000"
          value={order.price}
        /><br/>
        <input type="text" id="textInput" value={order.price}/><br/><br/>
        <label htmlFor="type">Buy/Sell</label><br/>
        <select name="type" id="type" onChange={handleChange}>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select><br/><br/>
        <button type="submit">Place Order</button>
      </form>
    </div>
  )
}

export default AddOrder
