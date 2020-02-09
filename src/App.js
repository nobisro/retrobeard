import React, { useState, createContext } from 'react';
import NavBar from './NavBar.js'
import { fetchData } from './utils.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ErrorBoundary from './ErrorBoundary';
import Board from './Board'
import { ROUTES, NO_TEAM } from './constants'
import './App.css';

export const BoardContext = createContext();

const App = () => {
  // Restrict error messages from polluting console in prod
  console.error = () => { }
  const [board, setBoard] = useState({})

  const handleCreateBoard = board => {
    setBoard(board)
  }

  const handleSetAdjacentBoard = (direction) => {
    fetchData(
      ROUTES.LOAD_ADJACENT,
      ROUTES.METHODS.POST,
      { 'team': board.team, 'created': board.created, 'direction': direction }
    ).then(async res => {
      const id = await res.json();
      window.location.replace(`/b/${id}`)
    }).catch(() => { })
  }

  const handleLoadTeam = team => {
    // We don't want to load team data for one off boards
    if (team === NO_TEAM) {
      return handleCreateBoard({
        team: team,
      })
    }
    fetchData(
      ROUTES.LOAD_TEAM,
      ROUTES.METHODS.POST,
      { team: team }
    ).then(async res => {
      const id = await res.json();
      if (!id) {
        throw new Error()
      }
      window.location.replace(`/b/${id}`)
    }).catch((e) => {
      handleCreateBoard({
        team: team,
        _id: '',
      })
    })
  }

  const handleDeleteBoard = () => {
    fetchData(
      ROUTES.DELETE,
      ROUTES.METHODS.DELETE,
      { board_id: board._id }
    ).then(() => {
      handleLoadTeam(board.team)
    }).catch(e => {
      console.log(e.toString())
    })
  }

  return (
    <ErrorBoundary>
      <Router>
        <BoardContext.Provider value={board._id}>
          <NavBar
            handleSetAdjacentBoard={handleSetAdjacentBoard}
            handleLoadTeam={handleLoadTeam}
            handleDeleteBoard={handleDeleteBoard}
            team={board.team}
            board_id={board._id}
            created={board.created}
          />
          <Switch>
            <Route path="/b/:id">
              <Board
                handleCreateBoard={handleCreateBoard}
                board={board}
              />
            </Route>
          </Switch>
        </BoardContext.Provider>
      </Router>
    </ErrorBoundary>
  )
};
export default App
