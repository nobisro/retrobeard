import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateBoardModal from './CreateBoardModal'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import dateFormat from 'dateformat'
import MessageModal from './MessageModal'
import { DeleteBoardButton } from './RetroButtons'

const h = '3rem'

const useStyles = makeStyles(theme => ({
    toolbar: {
        height: h,
        minHeight: '0px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    top: {
        position: 'sticky',
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
        position: 'sticky',
        flexGrow: 1,
        display: 'flex',
        height: h,
        alignItems: 'center'
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
        backgroundColor: 'inherit',
        '&:hover': {
            cursor: 'pointer'
        },
        fontSize: '1.25rem',
        height: '2.25rem'
    },
    arrow: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const NavBar = ({
    handleSetAdjacentBoard,
    handleLoadTeam,
    handleDeleteBoard,
    team,
    board_id,
    created }) => {
    const [createBoardOpen, setCreateBoardOpen] = useState(false)
    const [selectedTeam, setTeam] = React.useState(team)
    const [showWarning, setShowWarning] = React.useState(false)

    React.useEffect(() => {
        setTeam(team)
    }, [team])

    const classes = useStyles();
    const handleCloseCreateBoard = () => setCreateBoardOpen(false);


    const formatDate = date => {
        return dateFormat(date, "mmmm d, yyyy, h:MM TT");
    }

    const handleSelectTeam = (name) => {
        handleLoadTeam(name)
    }
    const handleConfirmDeleteBoard = () => {
        setShowWarning(true)
    }

    const handleRedirectHome = () => {
        window.location.replace('/b/')
    }


    return (
        <>
            <div className={classes.top}>
                <span style={{ cursor: 'pointer' }} onClick={handleRedirectHome}>Retrobeard</span>
            </div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <button
                                className={classes.button}
                                onClick={() => {
                                    setCreateBoardOpen(true)
                                }}
                            >
                                + new
                            </button>
                        </ButtonGroup>
                        {board_id && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {team !== 'No Team' && (
                                    <span className={classes.arrow} onClick={() => handleSetAdjacentBoard('BACK')}>
                                        <ArrowBackIosIcon />
                                    </span>
                                )}
                                <p>{formatDate(created)}</p>
                                {team !== 'No Team' && (
                                    <span className={classes.arrow} style={{
                                        marginLeft: '0.5rem'
                                    }} onClick={() => handleSetAdjacentBoard('FORWARD')}>    <ArrowForwardIosIcon />
                                    </span>
                                )}
                            </div>
                        )}
                        <div style={{
                            display: 'flex'
                        }}>
                            <TeamMenu
                                selectedTeam={selectedTeam}
                                setSelectedTeam={handleSelectTeam}
                            />
                            {board_id && (
                                <button className={classes.button} style={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                }} onClick={handleConfirmDeleteBoard}>
                                    X
                                </button>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                <CreateBoardModal
                    open={createBoardOpen}
                    handleClose={handleCloseCreateBoard}
                    selectedTeam={selectedTeam}
                />
            </div>
            <MessageModal
                open={showWarning}
                handleClose={() => {
                    setShowWarning(false)
                    handleDeleteBoard()
                }}
                handleBackdropClick={() => setShowWarning(false)}
                ButtonComponent={DeleteBoardButton}
                cta='Delete Board'
                text='Once you delete a board, there is no going back. Please be certain.'
                title='Delete this board'
            />
        </>
    );
}



const TeamMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [teams, setTeams] = React.useState(['No Team', 'SF Home Services'])

    const classes = useStyles();

    // @TODO implement if people want to add more teams
    // React.useEffect(() => {
    //     fetchData('/api/teams', 'GET').then(async res => {
    //         const ts = await res.json();
    //         setTeams();
    //     })
    // }, [])

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetTeam = name => {
        props.setSelectedTeam(name)
        handleClose();
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className={classes.button}
            >
                {props.selectedTeam || 'select a team'}
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {teams.map((name, i) => {
                    return (
                        <MenuItem
                            onClick={() => handleSetTeam(name)}
                            key={i}
                        >
                            {name}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}

export default NavBar