// @flow
import React, { useState, useEffect, createContext } from 'react';
import NavBar from './NavBar.js'
import Header from './Header.js'
import RetroModal from './RetroModal.js'
import './App.css';

export const BoardContext = createContext();


const App = () => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(-1);
  const [retroEdit, setRetroEdit] = useState({})
  const [board, setBoard] = useState({})

  useEffect(() => {
    console.log('updated board effect:', board)
  }, [board])

  const handleCreateBoard = board => {
    setBoard(board)
  }

  const openModal = (catId: string) => {
    setOpen(true)
    setCategory(catId)
  }
  const closeModal = () => setOpen(false)

  const handleAddCard = (retro) => {
    fetch('/api/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(retro)
    }).then(async response => {
      const board = await response.json()
      setBoard(board)
      closeModal()
    })
      .catch((e) => {
        console.log('e', e)
        closeModal()
      })
  }

  const handleDeleteCard = (boardId, catId, retroId) => {
    fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'board_id': boardId, 'category_id': catId, '_id': retroId })
    }).then(async res => {
      const board = await res.json();
      setBoard(board)
    })
  }

  const handleEditCard = (catId, retroId) => {
    const retro = board.categories.find(cat => cat._id === catId).retros.find(r => r._id === retroId)
    setOpen(true)
    setRetroEdit(retro)
  }

  const handleSaveEditedRetro = ({ title, description }) => {
    const editedRetro = Object.assign({}, retroEdit)
    editedRetro.title = title;
    editedRetro.description = description;

    fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedRetro)
    }).then(async res => {
      const editedBoard = await res.json();
      setBoard(editedBoard)
      closeModal()
      setRetroEdit({})
    })
  }

  return (
    <BoardContext.Provider value={board._id}>
      <NavBar
        handleCreateBoard={handleCreateBoard}
        setBoard={setBoard}
      />
      {!!Object.entries(board).length && (<div className='container'>
        {board.categories.map((category, index) => {
          return (
            <Header
              catId={category._id}
              key={category._id}
              catIndex={index}
              title={category.title}
              onClick={openModal}
              items={category.retros}
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
    </BoardContext.Provider>
  )

};
export default App
