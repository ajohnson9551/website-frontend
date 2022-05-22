import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const KeyGenForm = (props: {keyGenFunc: () => number[]}) => {
	const [modPubPriv, setModPubPriv] = useState([0, 0, 0]);

	const getValue = (i: number) => {
		return modPubPriv[i] === 0 ? "" : modPubPriv[i];
	}

	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		setModPubPriv(props.keyGenFunc());
	}

	const KGForm = (
		<Form onSubmit = {(e: FormEvent) => formSubmit(e)}>
			<Form.Group>
				<Form.Label as="h5">Modulus:</Form.Label>
				<Form.Control plaintext readOnly value={getValue(0)}/>
				<Form.Text className="text-muted">
					The modulus is needed for both encrypting and decrypting and can be freely shared.
				</Form.Text>
			</Form.Group>

			<Form.Group>
				<Form.Label as="h5">Public Key:</Form.Label>
				<Form.Control plaintext readOnly value={getValue(1)}/>
				<Form.Text className="text-muted">
					The public key is needed to encrypt messages and can be freely shared.
				</Form.Text>
			</Form.Group>

			<Form.Group>
				<Form.Label as="h5">Private Key:</Form.Label>
				<Form.Control plaintext readOnly value={getValue(2)}/>
				<Form.Text className="text-muted">
					The private key is needed to decrypt messages. Keep this secret!
				</Form.Text>
			</Form.Group>

			<Form.Group className="cryptBox">
				<div className="d-grid cryptoBox">
					<Button type="submit" variant="success">
						GENERATE NEW
					</Button>
				</div>
			</Form.Group>
			
		</Form>
	);

	return (
		<>
			{KGForm}
		</>
	)
}