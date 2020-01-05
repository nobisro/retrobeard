import React, { useState } from 'react';
import NavBar from './NavBar.js'
import Header from './Header.js'
import RetroModal from './RetroModal.js'
import RetroCard from './RetroCard.js';
import { HeaderButton } from './RetroButtons.js'
import { DEFAULT_HEADERS, DEFAULT_RETROS } from './constants.js';
import './App.css';

const App = () => {
  const [itemsObject, setItemsObject] = useState({})
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(-1);
  const [retroEdit, setRetroEdit] = useState({})
  const [board, setBoard] = useState({})

  // React.useEffect(() => {
  //   (async function fetchData() {
  //     const response = await fetch('/api/retros')
  //     const body = await response.json()
  //     if (response.status !== 200) throw Error(body.message)

  //     // ===============
  //     body.forEach(retro => {
  //       console.log('retro:', retro)
  //       const updatedItemsObject = Object.assign({}, itemsObject);
  //       if (!updatedItemsObject[retro.category]) {
  //         updatedItemsObject[retro.category] = []
  //       }
  //       updatedItemsObject[retro.category].push(retro)
  //       setItemsObject(updatedItemsObject);
  //     })
  //     // ===============
  //   })()
  // }, [])


  // ========= Create Board Response Structure =========
  //  {
  //    "_id":"5e122678fecde60d461a3ad2",
  //    "categories":[
  //      {"_id":"5e122678fecde60d461a3ace","title":"test1"},
  //      {"_id":"5e122678fecde60d461a3acf","title":"test2"},
  //      {"_id":"5e122678fecde60d461a3ad0","title":"test3"},
  //      {"_id":"5e122678fecde60d461a3ad1","title":"and four"}
  //     ],
  //     "__v":0
  //   }


  const handleCreateBoard = board => {
    setBoard(board)
  }



  const openModal = (catId) => {
    setOpen(true)
    setCategory(catId)
  }
  const closeModal = () => setOpen(false)

  const handleAddCard = (retro) => {
    // ========================
    fetch('/api/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(retro)
    }).then(async response => {
      const serverRetro = await response.json();
      const updatedItemsObject = Object.assign({}, itemsObject);
      if (!updatedItemsObject[serverRetro.catId]) {
        updatedItemsObject[serverRetro.catId] = []
      }
      updatedItemsObject[serverRetro.catId].push(serverRetro)
      setItemsObject(updatedItemsObject);
      console.log('itemsObject:', itemsObject)
      closeModal()
    })
      .catch(() => {
        closeModal()
      })

    // ========================

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

  const handleSaveEditedRetro = ({ title, description }) => {
    const { id, catId } = retroEdit

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
      <NavBar
        handleCreateBoard={handleCreateBoard}
      />
      {!!Object.entries(board).length && (<div className='container'>
        {board.categories.map(({ title, _id }) => {
          // @TODO factor Items list out of Header component, put here
          return (
            <Header
              key={_id}
              title={title}
              onClick={openModal}
              catId={_id}
              items={itemsObject[_id]}
              onDeleteRetro={handleDeleteCard}
              onEditRetro={handleEditCard}
            />
          )
        })}
      </div>)}

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
