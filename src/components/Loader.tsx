import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'Flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0, .1)',
            zIndex: 2
        }}>
            <Spinner animation='border' variant='info' style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
                zIndex: 1
            }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader