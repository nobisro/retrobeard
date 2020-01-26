import React, { useState } from 'react'
import { Modal, TextField } from '@material-ui/core';
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
        display: 'flex',
        // alignItems: 'center'
    };
}

const CreateBoardModal = ({ open, handleCreateBoard, closeCreateModa, onBackdropClick }) => {
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useCreateBoardStyle()
    const [categories, setCategories] = useState({ 0: '' })
    const MAX_CATEGORIES_NUM = 5;

    const addCategory = () => {
        const next = Object.keys(categories).length
        if (next < MAX_CATEGORIES_NUM) {
            setCategories({
                ...categories,
                [next]: ''
            })
        }
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
            const id = await response.json();
            window.location.replace(`/b/${id}`)
        })
            .catch(e => {
                console.log(e.toString())
            })
    }


    return (
        <Modal
            open={open}
            onBackdropClick={onBackdropClick}

        >
            <div style={modalStyle} className={classes.paper}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span className={classes.title}>Create your Retro Beard
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
                <div style={{
                    marginTop: 'auto'
                }}>
                    <AddCardButton
                        onClick={handleSubmit}
                        text='Create Board'
                    />
                </div>
            </div>
        </Modal>
    )
}

export default CreateBoardModal;