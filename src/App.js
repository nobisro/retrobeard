import React, { useState, useEffect, createContext } from 'react';
import NavBar from './NavBar.js'
import Header from './Header.js'
import RetroModal from './RetroModal.js'
import { fetchData } from './utils.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
<<<<<<< HEAD
=======
  Link,
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
  useParams
} from "react-router-dom";
import './App.css';

export const BoardContext = createContext();

<<<<<<< HEAD
const ChildApp = ({
  openModal,
  handleDeleteCard,
  handleEditCard,
  handleCreateBoard,
  board
}) => {
  const { id } = useParams();
=======
const ChildApp = ({ openModal, handleDeleteCard, handleEditCard }) => {
  const { id } = useParams();
  const [board, setBoard] = useState({})
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc

  useEffect(() => {
    fetchData('/api/load', 'POST', { 'board_id': id })
      .then(async res => {
<<<<<<< HEAD
        const b = await res.json();
        handleCreateBoard(b)
      }).catch(e => {
        throw e;
      })
  }, [id, handleCreateBoard])
=======
        const board = await res.json();
        setBoard(board)
      }).catch(e => {
        throw e;
      })
  }, [])
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
  return !!Object.entries(board).length && (
    <div className='container'>
      {board.categories.map((category, index) => {
        return (
<<<<<<< HEAD
          <>
            <Header
              key={index}
              catId={category._id}
              catIndex={index}
              title={category.title}
              onClick={openModal}
              items={category.retros}
              onDeleteRetro={handleDeleteCard}
              onEditRetro={handleEditCard}
            />
          </>
=======
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
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
        )
      })}
    </div>
  )
}
<<<<<<< HEAD
=======

>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc

const App = () => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(-1);
  const [retroEdit, setRetroEdit] = useState({})
  const [board, setBoard] = useState({})

  const handleCreateBoard = board => {
    setBoard(board)
  }

  const openModal = (catId) => {
    setOpen(true)
    setCategory(catId)
  }
  const closeModal = () => setOpen(false)

  const handleAddCard = (retro) => {
    fetchData('/api/save', 'POST', retro)
      .then(async response => {
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
    const data = { 'board_id': boardId, 'category_id': catId, '_id': retroId }
    fetchData('/api/delete', 'POST', data)
      .then(async res => {
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
    fetchData('/api/edit', 'POST', editedRetro)
      .then(async res => {
        const editedBoard = await res.json();
        setBoard(editedBoard)
        closeModal()
        setRetroEdit({})
      })
  }

  return (
    <Router>
      <BoardContext.Provider value={board._id}>
        <NavBar
          handleCreateBoard={handleCreateBoard}
          setBoard={setBoard}
        />
        <Switch>
          <Route path="/b/:id">
            <ChildApp
              openModal={openModal}
              handleDeleteCard={handleDeleteCard}
              handleEditCard={handleEditCard}
<<<<<<< HEAD
              handleCreateBoard={handleCreateBoard}
              board={board}
            />
          </Route>
        </Switch>
=======
            />
          </Route>

        </Switch>

>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
        <RetroModal
          open={open}
          closeModal={closeModal}
          handleAddCard={handleAddCard}
          catId={category}
          isEdit={!!Object.keys(retroEdit).length}
          handleSaveEditedRetro={handleSaveEditedRetro}
          retroEdit={retroEdit}
        />
<<<<<<< HEAD
=======

>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
      </BoardContext.Provider>
    </Router>
  )
};
<<<<<<< HEAD
export default App
=======
export default App



// !!Object.entries(board).length && (<div className='container'>
// {board.categories.map((category, index) => {
//   return (
//     <Header
//       catId={category._id}
//       key={category._id}
//       catIndex={index}
//       title={category.title}
//       onClick={openModal}
//       items={category.retros}
//       onDeleteRetro={handleDeleteCard}
//       onEditRetro={handleEditCard}
//     />
//   )
// })}
// </div>)
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
