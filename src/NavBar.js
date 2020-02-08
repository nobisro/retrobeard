import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateBoardModal from './CreateBoardModal'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import dateFormat from 'dateformat'

import { fetchData } from './utils';

const useStyles = makeStyles(theme => ({
    toolbar: {
        minHeight: '0px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    top: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '1.5rem',
        backgroundColor: '#00e1e1',
        paddingLeft: '1.5rem',
        fontFamily: 'Bangers',
        fontStyle: 'cursive',
    },
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    buttonGroup: {
        borderRightColor: 'white',
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
    },
    button: {
        boxShadow: '0 0 1px',
        margin: '0.25rem',
        color: 'white',
        borderRightColor: 'white',
        backgroundColor: 'inherit',
    }
}));

const NavBar = ({ handleCreateBoard, handleSetAdjacentBoard, team, board_id, created }) => {
    const [createOpen, setCreateOpen] = useState(false)
    const [selectedTeam, setTeam] = React.useState(team)

    console.log('board_id:', board_id)


    const setSelectedTeam = (name) => {
        if (board_id) {
            fetchData(
                '/api/edit_team',
                'POST',
                { 'board_id': board_id, 'team': name }
            ).then(async res => {
                const updatedTeam = await res.json();
                setTeam(updatedTeam)
            }).catch(e => {
                console.log('e:', e.toString())
            })
        } else {
            setTeam(name)
        }
    }

    React.useEffect(() => {
        setTeam(team)
    }, [team])

    const classes = useStyles();
    const closeCreateModal = () => setCreateOpen(false);


    const formatDate = date => {
        return dateFormat(date, "mmmm d, yyyy, h:MM TT");
    }


    return (
        <>
            <div className={classes.top}>
                <span>Retrobeard</span>
            </div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <ButtonGroup className={classes.buttonGroup} size="small" aria-label="small outlined button group">
                            <button
                                className={classes.button}
                                onClick={() => {
                                    setCreateOpen(true)
                                }}
                            >
                                CREATE
                            </button>
                        </ButtonGroup>
                        {board_id && (<div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span onClick={() => handleSetAdjacentBoard('BACK')}>
                                <ArrowBackIosIcon />
                            </span>
                            <p>Created: {formatDate(created)}</p>
                            <span onClick={() => handleSetAdjacentBoard('FORWARD')}>    <ArrowForwardIosIcon />
                            </span>
                        </div>
                        )}
                        <div>
                            <TeamMenu
                                selectedTeam={selectedTeam}
                                setSelectedTeam={setSelectedTeam}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <CreateBoardModal
                    open={createOpen}
                    handleCreateBoard={handleCreateBoard}
                    onBackdropClick={closeCreateModal}
                    onClose={closeCreateModal}
                    closeCreateModal={closeCreateModal}
                    selectedTeam={selectedTeam}
                />
            </div>
        </>
    );
}



const TeamMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [teams, setTeams] = React.useState(['SF Home Services', 'No Team', 'Test Team'])
    // const [anchorTeam, setAnchorTeam] = React.useState('');

    const classes = useStyles();


    React.useEffect(() => {
        fetchData('/api/teams', 'GET').then(async res => {
            const ts = await res.json();
            console.log('teams:', ts);
            // setTeams();
        })
    }, [])

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetTeam = name => {
        console.log('handleSetTeam:', name)
        props.setSelectedTeam(name)
        handleClose();
    }

    console.log('selectedTeam:', props.selectedTeam)



    return (
        <div>
            <button
                onClick={handleClick}
                className={classes.button}
            >
                {props.selectedTeam || 'SELECT TEAM'}
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {teams.map(name => {
                    return (
                        <MenuItem onClick={() => handleSetTeam(name)}>{name}</MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}

export default NavBar