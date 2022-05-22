import { Container, Row, Col } from "react-bootstrap";
import { CryptographyForm } from "../views/cryptography/CryptographyForm";
import { KeyGenForm } from "../views/cryptography/KeyGenForm";
import { cryptFunc } from "../mechanics/cryptography/Crypt";
import { decodeFunc } from "../mechanics/cryptography/Decode";
import { encodeFunc } from "../mechanics/cryptography/Encode";
import { keyGen } from "../mechanics/cryptography/KeyGen";
import { About } from "../views/About";
import about from "../data/PageAbouts";
import title from "../data/PageTitles";

export const CryptographyPage = () => {
	const disclaimer = (
		<p>
			DISCLAIMER: This script is a lightweight demonstration for educational purposes. Have fun, but do not rely on it to secure sensitive data.
		</p>
	);

	return (
		<Container fluid>
				<Row>
					{title.get("cryptography")}
				</Row>
				<Row>
					<Col>
						<Row>
							<Col>
								<KeyGenForm keyGenFunc={keyGen}/>
							</Col>
							<Col>
								<CryptographyForm
									encodeFunc={encodeFunc}
									decodeFunc={decodeFunc}
									cryptFunc={cryptFunc}
								/>
							</Col>
						</Row>
					</Col>
					<Col>
						<About abt={about.get("cryptography")}/>
					</Col>
				</Row>
		</Container>
		
	)
};