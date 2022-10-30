/** Styles */
import { Navbar } from 'react-bootstrap';
type Props = {}

const Header = (props: Props) => {
    return (
        <header>
            <Navbar bg="dark" fixed="top" variant="dark" expand="md" collapseOnSelect>
                <Navbar.Brand>
                    <span className="headerText">
                        Mehrwerk Challenge
                    </span>
                </Navbar.Brand>
            </Navbar>
        </header>
    )
}

export default Header