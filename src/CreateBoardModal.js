import React from 'react'
import { Modal, TextareaAutosize, Input, TextField, Button } from '@material-ui/core';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
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
        width: '90%'
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

const CreateBoardModal = ({ open }) => {
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useCreateBoardStyle()

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
                    <HeaderButton onClick={() => { }} />
                </div>

                <TextField
                    id="standard-full-width"
                    label="Category"
                    style={{ margin: 8 }}
                    // placeholder="Placeholder"
                    // fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <AddCardButton
                    onClick={() => { }}
                    text='Create Board'
                />
            </div>
        </Modal>
    )
}

export default CreateBoardModal;