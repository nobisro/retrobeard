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
        fontSize: 72,
        overflowWrap: 'break-word',
        flexBasis: 0,

    },
    content: {
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflowWrap: 'break-word',
        fontSize: 72,
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