import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
<<<<<<< HEAD
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateBoardModal from './CreateBoardModal'

=======
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateBoardModal from './CreateBoardModal'
import TextField from '@material-ui/core/TextField';
import { BoardContext } from './App.js'
import Typography from '@material-ui/core/Typography';
import { fetchData } from './utils.js'
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc


const useStyles = makeStyles(theme => ({
    toolbar: {
        minHeight: '0px'
    },
<<<<<<< HEAD
=======
    appBar: {
        // border: '2px solid yellow'
    },
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
    top: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '1.25rem',
        backgroundColor: '#00e1e1',
        paddingLeft: '1.5rem',
        fontFamily: 'Bangers',
        fontStyle: 'cursive',
    },
    root: {
        flexGrow: 1,
        display: 'flex',
    },
<<<<<<< HEAD
    buttonGroup: {
        borderRightColor: 'white',
=======
    create: {
        // paddingRight: '2rem'
    },
    buttonGroup: {
        // border: '4px solid red'
        borderRightColor: 'white',

>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    load: {
        position: 'relative',
        alignContent: 'flex-end',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        flexBasis: 300,
        flexShrink: 1,
        flexGrow: 1
<<<<<<< HEAD
    },
=======
    },
    loadText: {
        paddingLeft: '1rem',
        width: 250
    },
    board_id: {
        float: 'right',
        paddingLeft: '2rem'
    },


    createV2: {
        // border: '1px solid white',
        boxShadow: '0 0 1px',
        margin: '0.25rem',
        color: 'white',
        // borderRightColor: 'white',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: 'inherit',
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
    }
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
}));

const NavBar = ({ handleCreateBoard, setBoard }) => {
    const [createOpen, setCreateOpen] = useState(false)
<<<<<<< HEAD
=======
    const [boardIdDisplay, setBoardIdDisplay] = useState('')
    const board_id = React.useContext(BoardContext)

>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
    const classes = useStyles();

    const closeCreateModal = () => setCreateOpen(false);

    const handleLoadClick = () => {
        try {
            fetchData('/api/load', 'POST', { 'board_id': boardIdDisplay })
                .then(async res => {
                    const board = await res.json();
                    setBoard(board)
                }).catch(e => {
                    throw e;
                })
        } catch (e) {
            console.log('error loading board:', e.toString())
        }
    }

    return (
        <>
            <div className={classes.top}>
                <span>Retrobeard</span>
            </div>
            <div className={classes.root}>
<<<<<<< HEAD
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <ButtonGroup className={classes.buttonGroup} size="small" aria-label="small outlined button group">
                            <button
=======
                <AppBar className={classes.appBar} position="static">
                    <Toolbar className={classes.toolbar}>
                        <ButtonGroup className={classes.buttonGroup} size="small" aria-label="small outlined button group">
                            {/* <Button className={classes.create} color="inherit" onClick={() => {
                                setCreateOpen(true)
                            }}>Create
                            </Button> */}
                            {/* <div className={classes.load}> */}
                            {/* <Button className={classes.create} color="inherit" onClick={handleLoadClick}>Load</Button> */}
                            <button
                                // className={classes.createV2}
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
                                style={{
                                    boxShadow: '0 0 1px',
                                    margin: '0.25rem',
                                    color: 'white',
                                    borderRightColor: 'white',
<<<<<<< HEAD
=======
                                    // borderRadius: theme.shape.borderRadius,
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
                                    backgroundColor: 'inherit',
                                }}
                                onClick={() => {
                                    setCreateOpen(true)
                                }}
                            >
                                CREATE
                            </button>
<<<<<<< HEAD
                        </ButtonGroup>
=======
                            {/* <TextField className={classes.loadText} edge="start" onChange={e => {
                                setBoardIdDisplay(e.target.value)
                            }}></TextField> */}
                            {/* </div> */}
                        </ButtonGroup>
                        {/* <Typography variant="subtitle1" color="textPrimary" className={classes.board_id}>{`Board ID: ${board_id || ''}`}</Typography> */}
>>>>>>> 61e37d2235bd3d0741a927bd98cfc24385d365fc
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
        </>
    );
}

export default NavBar