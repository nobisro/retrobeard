import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: '25%',
        border: '1px solid red'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 1,
    },
    header: {
        background: 'green',
        padding: '0.5rem',
        color: 'white',
    }
});

const RetroCard = ({ title, description }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                title={title}
                className={classes.header}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RetroCard