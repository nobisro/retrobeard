import React, { useContext } from 'react'
import { BoardContext } from './App.js'
import { Modal, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCardButton } from './RetroButtons.js'
import { EMOJIS } from './constants.js'

const useModalStyle = makeStyles(theme => ({
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
        width: '95%'
    },
    description: {
        width: '95%',
        maxWidth: '95%',
        minWidth: '95%',
        minHeight: '7rem',
        maxHeight: '7rem',
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

const RetroModal = ({ open, closeModal, handleAddCard, catId, isEdit, handleSaveEditedRetro, retroEdit }) => {
    const classes = useModalStyle()

    const [modalStyle] = React.useState(getModalStyle)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [isValid, setIsValid] = React.useState(true)

    React.useEffect(() => {
        if (isEdit) {
            setTitle(retroEdit.title)
            setDescription(retroEdit.description)
        }
    }, [isEdit, retroEdit])

    const clearAll = () => {
        setTitle('')
        setDescription('')
    }

    const validateTitle = (value) => {
        if (value.length) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    const boardID = useContext(BoardContext);

    return (
        <Modal
            className={classes.root}
            open={open}
            onBackdropClick={closeModal}
            onClose={clearAll}
        >
            <div style={modalStyle} className={classes.paper}>
                <p className={classes.bold}>Title</p>
                <Input
                    color='primary'
                    type='text'
                    placeholder='Required'
                    width="50"
                    className={classes.title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        validateTitle(e.target.value)
                    }}
                    value={title}
                    error={!isValid}
                />
                <p className={classes.bold}>Description</p>
                <textarea
                    placeholder='Optional'
                    className={classes.description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    value={description}
                    style={{
                        fontSize: 16
                    }}
                />

                <div style={{
                    display: 'flex',
                    alignContent: 'space-between',
                    padding: '0.5rem 0.25rem'
                }
                }>
                    {EMOJIS.map((emoji, index) => (
                        <span
                            key={index}
                            style={{ fontSize: 26, padding: '0.2rem', marginTop: '1rem' }}
                            onClick={() => {
                                setDescription(description + emoji)
                            }}
                        >
                            {emoji}
                        </span>))}
                </div>

                <div style={{
                    marginTop: 'auto'
                }}>
                    <AddCardButton
                        onClick={() => {
                            validateTitle(title);

                            if (!isValid) {
                                console.log('not valid')
                                return;
                            }

                            if (isEdit && isValid) {
                                handleSaveEditedRetro({
                                    title: title,
                                    description: description,
                                })
                                clearAll();
                                return;
                            }

                            const validatedDescription = description.length ? description : 'No description provided.'

                            console.log(boardID, catId, title, validatedDescription)

                            handleAddCard({
                                board_id: boardID,
                                category_id: catId,
                                title: title,
                                description: validatedDescription,
                            })
                            clearAll()
                        }}
                        text={isEdit ? 'edit card' : 'add card'}
                    />

                </div>
            </div>
        </Modal>
    )
}

export default RetroModal;