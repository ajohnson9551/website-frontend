import { Col, Container, Row } from "react-bootstrap";
import about from "../data/PageAbouts";
import title from "../data/PageTitles";
import { About } from "../views/About";

export const ContactPage = () => {
	return (
		<Container fluid>
				<Row>
					{title.get("contact")}
				</Row>
				<Row>
					<Col lg={{span: 10, offset: 1}}>
						<About abt={about.get("contact")}/>
					</Col>
				</Row>
		</Container>
	)
};