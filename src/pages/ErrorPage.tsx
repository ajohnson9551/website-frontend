import { Col, Container, Row } from "react-bootstrap";
import title from "../data/PageTitles";

export const ErrorPage = () => {
	return (
		<Container fluid>
				<Row>
					{title.get("error")}
				</Row>
				<Row>
					<div className="text-center"><p>Use the navbar to return to an existing page.</p></div>
				</Row>
		</Container>
	)
};