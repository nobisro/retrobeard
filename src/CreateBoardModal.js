import React, { useState } from 'react'
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HeaderButton, AddCardButton } from './RetroButtons'

const useCreateBoardStyle = makeStyles(theme => ({
    root: {
        color: 'black',
        margin: theme.spacing(1),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 300,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[8],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        width: '90%',
        paddingBottom: '1rem'
    },
    bold: {
        fontWeight: 'bold',
    }
}))

const getModalStyle = () => {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
}

const CreateBoardModal = ({ open, handleCreateBoard, closeCreateModal }) => {
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useCreateBoardStyle()

    const [categories, setCategories] = useState({ 0: '' })

    const addCategory = () => {
        const next = Object.keys(categories).length
        //@TODO open modal to convey to user the maximum number of categories (5)
        setCategories({
            ...categories,
            [next]: ''
        })
    }

    const handleChange = e => {
        setCategories({
            ...categories,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categories)
        }).then(async response => {
            const board = await response.json();
            console.log('board:', board)
            closeCreateModal()
            handleCreateBoard(board)
            // close modal
            // set categories
        })
    }


    return (
        <Modal
            open={open}
        >
            <div style={modalStyle} className={classes.paper}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span className={classes.title}>Create your Retro Board
                    </span>
                    <HeaderButton onClick={addCategory} />
                </div>
                {Object.keys(categories).map(cat => {
                    return (
                        <TextField
                            id="standard-full-width"
                            label={`Category #${cat}`}
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name={cat}
                            onChange={(e) => {
                                handleChange(e)
                            }}
                        />
                    )
                })}
                <AddCardButton
                    onClick={handleSubmit}
                    text='Create Board'
                />
            </div>
        </Modal>
    )
}

export default CreateBoardModal;