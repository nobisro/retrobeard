import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CreateBoardModal from './CreateBoardModal'
import TextField from '@material-ui/core/TextField';
import { BoardContext } from './App.js'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
    },
    load: {
        // position: 'relative',
        alignContent: 'flex-end',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.3),
        },
        marginLeft: 0,
        width: '7rem',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    board_id: {
        float: 'right',
        paddingLeft: '2rem'
    }
}));

const NavBar = ({ handleCreateBoard, setBoard }) => {
    const [createOpen, setCreateOpen] = useState(false)
    const [boardId, setBoardId] = useState('')
    const board_id = React.useContext(BoardContext)

    const classes = useStyles();

    const closeCreateModal = () => setCreateOpen(false);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => {
                        setCreateOpen(true)
                    }}>Create</Button>
                    <div className={classes.load}>
                        <Button color="inherit" onClick={() => {
                            try {
                                fetch('/api/load', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ 'board_id': boardId })
                                }).then(async res => {
                                    const board = await res.json();
                                    setBoard(board)
                                }).catch(e => {
                                    throw e;
                                })
                            } catch (e) {
                                console.log('error loading FE:', JSON.stringify(e))
                            }
                        }}>Load</Button>
                        <TextField edge="start" onChange={e => {
                            setBoardId(e.target.value)
                        }}></TextField>
                    </div>
                    <Typography variant="h6" color="textSecondary" className={classes.board_id}>{`Board ID: ${board_id || ''}`}</Typography>
                </Toolbar>
            </AppBar>
            <CreateBoardModal
                open={createOpen}
                handleCreateBoard={handleCreateBoard}
                onBackdropClick={closeCreateModal}
                onClose={closeCreateModal}
                closeCreateModal={closeCreateModal}
            />
        </div>
    );
}

export default NavBar