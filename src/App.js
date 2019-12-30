import React, { useState } from 'react';
import Header from './Header.js'
import RetroModal from './RetroModal.js'
import RetroCard from './RetroCard.js';
import { HeaderButton } from './RetroButtons.js'
import { DEFAULT_HEADERS, DEFAULT_RETROS } from './constants.js';
import './App.css';

const App = () => {
  const [itemsObject, setItemsObject] = useState(DEFAULT_RETROS)
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(-1);
  const [retroEdit, setRetroEdit] = useState({})

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

  const handleDeleteCard = (catId, retroId) => {
    const updatedItemsObject = Object.assign({}, itemsObject);

    if (updatedItemsObject[catId]) {
      updatedItemsObject[catId] = updatedItemsObject[catId].filter((retro) => retro.id !== retroId)
      setItemsObject(updatedItemsObject)
    }
  }

  const handleEditCard = (catId, retroId) => {
    const retro = itemsObject[catId].find(retro => retro.id === retroId)
    setOpen(true)
    setRetroEdit(retro)
  }

  const handleSaveEditedRetro = ({title, description}) => {
    const {id, catId} = retroEdit

    const editedRetro = Object.assign({}, retroEdit)
    editedRetro.title = title;
    editedRetro.description = description;

    const updatedItemsObject = Object.assign({}, itemsObject);
    if (updatedItemsObject[catId]) {
      updatedItemsObject[catId].forEach((retro, index) => {
        if (retro.id == id) {
          updatedItemsObject[catId][index] = editedRetro
        }
      })
      console.log('editedRetro:', editedRetro)
      setItemsObject(updatedItemsObject)
      setRetroEdit({})
      closeModal()
    }

  }
  

  return (
    <>
      <div className='container'>
        {DEFAULT_HEADERS.map(({ title, catId }) => {
          // @TODO factor Items list out of Header component, put here
            return (
              <Header
                key={catId} 
                title={title}
                onClick={openModal}
                catId={catId}
                items={itemsObject[catId]}
                onDeleteRetro={handleDeleteCard}
                onEditRetro={handleEditCard}
              />
            )
    })}
      </div>

      <RetroModal
        open={open}
        closeModal={closeModal}
        handleAddCard={handleAddCard}
        catId={category}

        isEdit={!!Object.keys(retroEdit).length}
        handleSaveEditedRetro={handleSaveEditedRetro}
        retroEdit={retroEdit}
      />

    </>
  )

};
export default App
