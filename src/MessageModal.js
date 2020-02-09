import React from 'react'
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useMessageModalStyles = makeStyles(theme => ({
    root: {
        color: 'black',
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 400,
        height: 125,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[8],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        fontWeight: 'bold',
        color: 'red'
    }
}))

const getModalStyle = () => {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
    };
}

const MessageModal = ({ open, handleClose, handleBackdropClick, text, ButtonComponent = null, cta = '', title = '' }) => {
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useMessageModalStyles()

    return (
        <Modal
            open={open}
            onBackdropClick={handleBackdropClick}
        >
            <div style={modalStyle} className={classes.paper}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'column'

                    }}
                >
                    <div className={classes.title}>{title}
                    </div>
                    <p>{text}</p>
                </div>

                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    {ButtonComponent && (
                        <ButtonComponent
                            onClick={handleClose}
                            text={cta}
                        />
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default MessageModal;