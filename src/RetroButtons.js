import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    btn: {
        background: 'green',
        borderRadius: 3,
        alignItems: 'flex-end',
    },
}))

export const HeaderButton = ({ onClick, catId }) => {
    return (
        <IconButton
            color='primary'
            size='size'
            onClick={onClick}
        >
            <AddIcon />
        </IconButton>
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
