import React, { useState } from 'react';
import RetroModal from './RetroModal.js'
import RetroCard from './RetroCard.js';
import { HeaderButton } from './RetroButtons.js'
import { DEFAULT_HEADERS } from './constants.js';
import './App.css';


const App = () => {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(-1);

  const openModal = (catId) => {
    setOpen(true)
    setCategory(catId)
  }
  const closeModal = () => setOpen(false)

  const handleAddCard = (retro) => {
    const updatedItems = [...items];
    updatedItems.push(retro)
    setItems(updatedItems)
    closeModal()
  }

  const createHeaders = () => {
    return DEFAULT_HEADERS.map(({ title, catId }) => {
      return (
        <div className={`header item-${catId}`}>
          {title}
          <HeaderButton
            onClick={openModal}
            catId={catId}
          />

        </div>
      )
    })
  }

  const createItems = () => {
    return items.map(item => {
      return (
        <RetroCard
          title={item.title}
          description={item.description}
        />
      )
    })
  }

  return (
    <>
      <div className='container'>
        {createHeaders()}
        {createItems()}
      </div>

      <RetroModal
        open={open}
        closeModal={closeModal}
        handleAddCard={handleAddCard}
      />

    </>
  )

};
export default App
