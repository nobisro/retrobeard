import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    container: {
        display: 'flex'
    },
    card: {
        // maxWidth: '300px',
        maxWidth: '300px',
        minWidth: '25%',
        // flexBasis: '200px',
        border: '1px solid red',
        flexWrap: 'wrap',
        flexGrow: 1,
        overflowWrap: 'break-word',
        margin: '1rem 0.5rem'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
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
    },
    content: {
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflowWrap: 'break-word',
        fontSize: 72,
    }
});

const RetroCard = ({ title, description }) => {
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
        </Card>
        </div>
    );
}

export default RetroCard