import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // You can log the error to an external service here
        console.error('ErrorBoundary caught an error', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{padding: '2rem', textAlign: 'center'}}>
                    <h2>Something went wrong.</h2>
                    <p>We're having trouble loading this part of the app. Try refreshing the page.</p>
                    <details style={{whiteSpace: 'pre-wrap', textAlign: 'left', maxWidth: '800px', margin: '1rem auto'}}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
