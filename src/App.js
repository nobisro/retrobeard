import React, { useState } from 'react';
import Header from './Header.js'
import RetroModal from './RetroModal.js'
import RetroCard from './RetroCard.js';
import { HeaderButton } from './RetroButtons.js'
import { DEFAULT_HEADERS } from './constants.js';
import './App.css';


const App = () => {
  const [items, setItems] = useState([])
  const [itemsObject, setItemsObject] = useState({})
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(-1);

  const openModal = (catId) => {
    setOpen(true)
    setCategory(catId)
  }
  const closeModal = () => setOpen(false)

  const handleAddCard = (retro) => {
    const updatedItemsObject = Object.assign({}, itemsObject);
    if (!updatedItemsObject[retro.catId]) {
      updatedItemsObject[retro.catId] = []
    }
    updatedItemsObject[retro.catId].push(retro)
    setItemsObject(updatedItemsObject);
    closeModal()
  }

  return (
    <>
      <div className='container'>
        {DEFAULT_HEADERS.map(({ title, catId }) => {
            return (
              <Header 
                title={title}
                onClick={openModal}
                catId={catId}
                items={itemsObject[catId]}
              />
            )
    })}
      </div>

      <RetroModal
        open={open}
        closeModal={closeModal}
        handleAddCard={handleAddCard}
        catId={category}
      />

    </>
  )

};
export default App
