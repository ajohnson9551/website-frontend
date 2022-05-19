import { Container, Row, Col } from "react-bootstrap";
import { CryptographyForm } from "../views/cryptography/CryptographyForm";
import { KeyGenForm } from "../views/cryptography/KeyGenForm";
import { cryptFunc } from "../mechanics/cryptography/Crypt";
import { decodeFunc } from "../mechanics/cryptography/Decode";
import { encodeFunc } from "../mechanics/cryptography/Encode";
import { keyGen } from "../mechanics/cryptography/KeyGen";

export const CryptographyPage = () => {
	const disclaimer = (
		<p>
			DISCLAIMER: This script is a lightweight demonstration for educational purposes. Have fun, but do not rely on it to secure sensitive data.
		</p>
	);

	return (
		<div>
			<p>
				Cryptography Page
			</p>
			{disclaimer}
			<Container>
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
			</Container>
		</div>
	)
};