import React from 'react'
import './ProductList.css'
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'
import { useState, useEffect, useCallback } from 'react'

const products = [
  { id: '1', title: 'Jeans', price: 119, description: 'Blue color, straight' },
  { id: '2', title: 'Jeans', price: 139, description: 'Blue color, slim' },
  { id: '3', title: 'Hoodie', price: 89, description: 'Relaxed Fit Graphic' },
  { id: '4', title: 'Sweatshirt', price: 89, description: 'Crewneck Sweatshirt' },
  { id: '5', title: 'Jacket', price: 149, description: 'Sherpa Trucker Jacket' },
  { id: '6', title: 'Overshirt', price: 69, description: 'Classic Worker Overshirt' },
  { id: '7', title: 'Tee', price: 25, description: 'Relaxed Fit Tee, Black' },
  { id: '8', title: 'Tee', price: 25, description: 'Relaxed Fit Tee, White' },
]

const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    }
    fetch('http://localhost:8000', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }, [country, street, entity])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id);
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy $${getTotalPrice(newItems)}`
      });
    }
  }

  return (
    <div className={'list'}>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default ProductList