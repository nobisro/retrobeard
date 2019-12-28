import React from 'react'
import { Modal, TextareaAutosize, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCardButton } from './RetroButtons.js'

const useModalStyle = makeStyles(theme => ({
    root: {
        color: 'black',
        margin: theme.spacing(1),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 200,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        width: '95%'
    },
    description: {
        width: '95%'
    }
}))

const getModalStyle = () => {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
}

const RetroModal = ({ open, closeModal, handleAddCard }) => {
    const classes = useModalStyle()
    const [modalStyle] = React.useState(getModalStyle)

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const clearAll = () => {
        setTitle('')
        setDescription('')
    }

    return (
        <Modal
            className={classes.root}
            open={open}
            onBackdropClick={closeModal}
        >
            <div style={modalStyle} className={classes.paper}>
                <p>Add a card</p>
                <p>Title</p>
                <Input
                    color='primary'
                    type='text'
                    placeholder='Required'
                    width="50"
                    className={classes.title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <p>Description</p>
                <TextareaAutosize
                    placeholder='Optional'
                    rowsMin={4}
                    className={classes.description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <AddCardButton
                    onClick={() => {
                        handleAddCard({
                            title: title,
                            description: description
                        })
                        clearAll()
                    }}
                    text='add card'
                />
            </div>
        </Modal>
    )
}

export default RetroModal;