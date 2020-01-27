import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { BoardContext } from './App.js'
import { BACKGROUND_COLOR_MAP } from './constants'

const useStyles = makeStyles(theme => {
    return ({
        container: {
            display: 'flex',
        },
        card: {
            width: '100%',
            flexWrap: 'wrap',
            overflowWrap: 'break-word',
            margin: '1rem 1rem',
            boxShadow: theme.shadows[2],
            flexBasis: 0,
            minWidth: '175px',
            flexShrink: 0,
            flexGrow: 1,
        },
        title: {
            fontSize: theme.typography.h6.fontSize,
        },
        pos: {
            marginBottom: 1,
        },
        header: {
            flexBasis: '150px',
            padding: '0.5rem',
            overflowWrap: 'break-word',
            fontSize: '30px'
        },
        content: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            overflowWrap: 'break-word',
            fontSize: '72pt',
            minHeight: '65px',
        }
    })
});

const RetroCard = ({ id, title, description, catId, catIndex, onDeleteRetro, onEditRetro }) => {
    const classes = useStyles();
    const board_id = React.useContext(BoardContext)
    return (
        <>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        title={<span style={{
                            fontSize: '1.25rem',
                            lineHeigth: '1'
                        }}>{title}</span>}
                        className={classes.header}
                        style={{ backgroundColor: BACKGROUND_COLOR_MAP[catIndex], fontSize: 10 }}
                    >
                    </CardHeader>
                    <CardContent className={classes.content}>
                        <Typography
                            variant="body1"
                            color="textPrimary"
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
                            fontSize: '.75rem',
                        }}
                    >
                        <span style={{
                            display: 'flex',
                            alignItems: 'center'
                        }} onClick={() => {
                            onEditRetro(catId, id)
                        }}>
                            <EditIcon />
                            Edit
                </span>
                        <span style={{
                            display: 'flex',
                            alignItems: 'center'
                        }} onClick={() => {
                            onDeleteRetro(board_id, catId, id)
                        }}>
                            <DeleteIcon />
                            Delete
                </span>
                    </div>
                </Card>
            </div>
        </>
    );
}

export const RetroCardList = ({ items, catIndex, onDeleteRetro, onEditRetro }) => {
    return items.map(item => {
        return (
            <RetroCard
                id={item._id}
                key={item._id}
                title={item.title}
                description={item.description}
                catId={item.category_id}
                catIndex={catIndex}
                onDeleteRetro={onDeleteRetro}
                onEditRetro={onEditRetro}
            />
        )
    })
}

export default RetroCard