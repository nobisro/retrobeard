import React, { useState, useEffect } from 'react';
import Category from './Category.js'
import { fetchData } from './utils.js'
import {
    useParams
} from "react-router-dom";
import MessageModal from './MessageModal'
import { BackToSafety } from './ErrorBoundary';
import CreateRetroModal from './CreateRetroModal.js'
import { ROUTES } from './constants'


const Board = ({ handleCreateBoard, board }) => {
    const { id } = useParams();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [openRetroModal, setOpenRetroModal] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(null)
    const [retroEdit, setRetroEdit] = useState({})

    const handleOpenModal = (catId) => {
        setOpenRetroModal(true)
        setCurrentCategory(catId)
    }
    const handleCloseModal = () => setOpenRetroModal(false)

    const handleAddCard = (retro) => {
        fetchData(ROUTES.SAVE, ROUTES.METHODS.POST, retro)
            .then(async response => {
                const board = await response.json()
                handleCreateBoard(board)
                handleCloseModal()
            })
            .catch((e) => {
                handleCloseModal()
            })
    }

    const handleSaveEditedRetro = ({ title, description }) => {
        const editedRetro = Object.assign({}, retroEdit)
        editedRetro.title = title;
        editedRetro.description = description;
        fetchData(ROUTES.EDIT, ROUTES.METHODS.POST, editedRetro)
            .then(async res => {
                const editedBoard = await res.json();
                handleCreateBoard(editedBoard)
                handleCloseModal()
                setRetroEdit({})
            })
    }

    const handleEditCard = (catId, retroId) => {
        const retro = board.categories.find(cat => cat._id === catId).retros.find(r => r._id === retroId)
        setOpenRetroModal(true)
        setRetroEdit(retro)
    }

    const handleDeleteCard = (boardId, catId, retroId) => {
        const data = { 'board_id': boardId, 'category_id': catId, '_id': retroId }
        fetchData(ROUTES.DELETE, ROUTES.METHODS.POST, data)
            .then(async res => {
                const board = await res.json();
                handleCreateBoard(board)
            })
    }

    useEffect(() => {
        fetchData(
            ROUTES.LOAD,
            ROUTES.METHODS.POST,
            { 'board_id': id }
        ).then(async res => {
            const b = await res.json();
            handleCreateBoard(b)
        }).catch(() => {
            setShowErrorMessage(true)
        })
    }, [id])

    if (showErrorMessage) {
        return (
            <MessageModal
                open
                handleClose={() => setShowErrorMessage(false)}
                handleBackdropClick={() => setShowErrorMessage(false)}
                text="Sorry, we couldn't find a Retroboard with that ID"
                title="Page Not Found"
                ButtonComponent={BackToSafety}
            />
        )
    }
    if (!board.categories) {
        return <span></span>
    }
    return (
        <>
            <div className='container'>
                {board.categories.map((category, index) => {
                    return (
                        <Category
                            key={index}
                            categoryId={category._id}
                            categoryIndex={index}
                            title={category.title}
                            items={category.retros}
                            onClick={handleOpenModal}
                            onDeleteRetro={handleDeleteCard}
                            onEditRetro={handleEditCard}
                        />
                    )
                })}
            </div>
            <CreateRetroModal
                open={openRetroModal}
                isEdit={!!Object.keys(retroEdit).length}
                categoryId={currentCategory}
                retroEdit={retroEdit}
                handleCloseModal={handleCloseModal}
                handleAddCard={handleAddCard}
                handleSaveEditedRetro={handleSaveEditedRetro}
            />
        </>
    )
}

export default Board