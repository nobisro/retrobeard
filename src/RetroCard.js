import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const BACKGROUND_COLOR_MAP = {
    1: '#1d781d',
    // 2: '#00B2EE',
    // 2: 'rgb(40,120,180)',
    2: '#01768b',
    3: '#ff960b',
    4: '#7f187f',
}

const useStyles = makeStyles(theme =>({
    container: {
        display: 'flex',
    },
    card: {
        width: '100%',
        flexWrap: 'wrap',
        flexGrow: 1,
        overflowWrap: 'break-word',
        margin: '1rem 0.5rem',
        boxShadow: theme.shadows[2],
        // fontSize: theme.fontSize
    },
    // bullet: {
    //     display: 'inline-block',
    //     margin: '0 2px',
    //     transform: 'scale(0.8)',
    // },
    title: {
        fontSize: 22,
    },
    pos: {
        marginBottom: 1,
    },
    header: {
        background: 'green',
        padding: '0.5rem',
        color: 'white',
        border: '1px solid red',
        overflowWrap: 'break-word',
    },
    content: {
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflowWrap: 'break-word',
        fontSize: '72pt',
        minHeight: '100px',

    }
}));

const RetroCard = ({ id, title, description, catId, onDeleteRetro, onEditRetro }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
        <Card className={classes.card}>
            <CardHeader
                title={title}
                className={classes.header}
                style={{backgroundColor: BACKGROUND_COLOR_MAP[catId]}}
            >
            <Typography className={classes.title} color="textPrimary" gutterBottom>
                {title}
            </Typography>
            </CardHeader>
            <CardContent className={classes.content}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    {description}
                </Typography>
            </CardContent>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingBottom: '0.5rem',
                    fontSize: '1rem',
                }}
            >
                <span onClick={()=>{
                    onEditRetro(catId, id)
                }}>
                    <EditIcon />
                    Edit
                </span>
                <span onClick={()=>{
                    onDeleteRetro(catId, id)
                }}>
                    <DeleteIcon />
                    Delete
                </span>
            </div>
        </Card>
        </div>
    );
}

export default RetroCard