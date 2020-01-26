import React from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { BoardContext } from './App.js'

const BACKGROUND_COLOR_MAP = ['#1d781d', '#01768b', '#ff960b', '#7f187f']

const theme = createMuiTheme({
    typography: {
        fontSize: '2.25rem',
        lineHeight: 0
    }
})


const useStyles = makeStyles(theme => {
    console.log('theme:', theme)
    return ({
        container: {
            display: 'flex',
        },
        card: {
            width: '100%',
            flexWrap: 'wrap',
            overflowWrap: 'break-word',
            margin: '1rem 0.5rem',
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
            minHeight: '100px',

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
                        title={title}
                        className={classes.header}
                        style={{ backgroundColor: BACKGROUND_COLOR_MAP[catIndex], fontSize: 10 }}
                    >
                        <ThemeProvider theme={theme}>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                {title}
                            </Typography>
                        </ThemeProvider>

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
                            fontSize: '1rem',
                        }}
                    >
                        <span onClick={() => {
                            onEditRetro(catId, id)
                        }}>
                            <EditIcon />
                            Edit
                </span>
                        <span onClick={() => {
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