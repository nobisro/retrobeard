import React from 'react'
import { Modal, TextareaAutosize, Input } from '@material-ui/core';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
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
        width: '95%',
        maxWidth: '95%',
        minWidth: '95%',
        minHeight: '8rem',
        maxHeight: '8rem',
    }
}))

const getModalStyle = () => {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
}

const RetroModal = ({ open, closeModal, handleAddCard, catId }) => {
    const classes = useModalStyle()

    const [modalStyle] = React.useState(getModalStyle)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const emojis = ['🍻', '😻', '💡', '🤔', '🔥', '🏁']


    const clearAll = () => {
        setTitle('')
        setDescription('')
    }

    return (
        <Modal
            className={classes.root}
            open={open}
            onBackdropClick={closeModal}
            catId={catId}
        >
            <div style={modalStyle} className={classes.paper}>
                {/* <p>Add a card</p> */}
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
                <textarea
                    placeholder='Optional'
                    rowsMin={4}
                    className={classes.description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    value={description}
                />

                <div style={{
                    display: 'flex', 
                    alignContent: 'space-between', 
                    padding: '0.5rem 0.25rem'}
                }>
                    {emojis.map(emoji => (
                    <span 
                        style={{fontSize: 32}} 
                        onClick={()=>{

                            setDescription(description + emoji)
                        }}
                    >
                    {emoji}
                    </span>))}
                </div>

                
                <AddCardButton
                    onClick={() => {
                        handleAddCard({
                            id: Math.floor(Math.random() * 100000),
                            catId: catId, 
                            title: title,
                            description: description,
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