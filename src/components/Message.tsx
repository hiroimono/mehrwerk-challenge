import { Alert } from 'react-bootstrap';

type Props = {
    variant: string,
    children: any
}

const Message = ({ variant, children }: Props) => {
    return (
        <Alert variant={variant} className="px-2">
            {children}
        </Alert>
    )
}

export default Message

Message.defaultProps = {
    variant: 'info'
}