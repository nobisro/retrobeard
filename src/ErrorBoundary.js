import React from 'react'
import MessageModal from './MessageModal'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export function BackToSafety() {
    const goBack = () => window.location.replace('/')
    return (
        <div
            style={{
                display: 'flex',
            }}
            onClick={goBack}
        >
            <ArrowBackIcon />
            <span style={{ margin: '0 1rem' }}>Back to the homepage</span>
        </div>
    )
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            showModal: false,
            message: ''
        }
    }

    componentDidCatch = (error) => {
        this.setState({
            hasError: true,
            showModal: true,
            message: error.toString()
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
        })
    }

    render() {
        if (this.state.hasError) {
            console.log('Error caught in ErrorBoundary')
            return (
                <MessageModal
                    open={this.state.hasError}
                    handleClose={this.closeModal}
                    handleBackdropClick={this.closeModal}
                    text={"It looks like something went wrong!"}
                    title={"Oh no"}
                    ButtonComponent={BackToSafety}
                />
            )
        } else {
            return this.props.children
        }
    }
}

export default ErrorBoundary
