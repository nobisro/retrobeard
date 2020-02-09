import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    btn: {
        borderRadius: 3,
    },
}))

export const HeaderButton = ({ handleClick, categoryId }) => {
    return (
        <div className="header-button">
            <IconButton
                color='primary'
                size='small'
                onClick={() => handleClick(categoryId)}
            >
                <AddIcon />
            </IconButton>
        </div>
    )
}

export const AddCardButton = ({ onClick, text }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}

export const DeleteBoardButton = ({ onClick, text }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}