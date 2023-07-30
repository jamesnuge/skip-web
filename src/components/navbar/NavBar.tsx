import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const deleteToken = () => {
    localStorage.removeItem('authToken')
}

const logout = () => {
    deleteToken();
    window.location.reload();
}

export const NavBar = () => {

    return <Navbar bg='dark' variant='dark'>
        <Container>
            <Navbar.Brand>
                Data Skip
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Results" id="results-dropdown">
                    <NavDropdown.Item href="/results">All</NavDropdown.Item>
                    <NavDropdown.Item href="/query">Ranked search</NavDropdown.Item>
                    <NavDropdown.Item href="/add">Add</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Locations" id="locations-dropdown">
                    <NavDropdown.Item href="/location/all">View all</NavDropdown.Item>
                    <NavDropdown.Item href="/locations/create">Add</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Vehicle" id="vehicle-dropdown">
                    <NavDropdown.Item href="/vehicle/all">View all</NavDropdown.Item>
                    <NavDropdown.Item href="/vehicle/create">Add</NavDropdown.Item>
                    <NavDropdown.Item href="/vehicle/newCreate">New Add</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Chassis" id="chassis-dropdown">
                    <NavDropdown.Item href="/chassis/all">View all</NavDropdown.Item>
                    <NavDropdown.Item href="/chassis/create">Add</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className='ml-auto'>
                <Nav.Item>
                    <a href="/" onClick={() => logout()} className='nav-link ml-auto'>Logout</a>
                </Nav.Item>
            </Nav>
        </Container>
    </Navbar>
}
