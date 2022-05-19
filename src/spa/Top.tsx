import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Top = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Item>
						<Nav.Link as={Link} to="/home">Home</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/digitrecognition">Digit Recognition</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/lunarlander">Lunar Lander</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/cryptography">Cryptography</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/math">Math</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/contact">Contact</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
};