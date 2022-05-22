import { FormEvent, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

export const CryptographyForm = (props: {
		encodeFunc: (message: string) => number[],
		decodeFunc: (code: number[]) => string,
		cryptFunc: (mod: number, key: number, code: number[]) => number[]}) => {	
	
	const [mode, setMode] = useState("enc");
	const [message, setMessage] = useState("");
	const [crypt, setCrypt] = useState("");
	const [mod, setMod] = useState(1);
	const [key, setKey] = useState(1);
	const [invalidMessage, setInvalidMessage] = useState("");

	const getKeyName = () => {
		switch(mode) {
			case "enc":
				return "Public Key";
			case "dec":
				return "Private Key";
		}
	}

	const getButtonText = (base: string) => {
		switch(mode) {
			case "enc":
				return ("En" + base).toUpperCase();
			case "dec":
				return ("De" + base).toUpperCase();
		}
	}

	const switchMode = (newMode: string) => {
		setMode(newMode);
		setInvalidMessage("");
	}

	const messageChanged = (e: any) => {
		e.preventDefault();
		setMessage(e.target.value);
	}

	const arrayToString = (arr: number[]) => {
		let out = "";
		for (let n of arr) {
			out += `${n}.`;
		}
		return out;
	}

	const stringToArray = (str: string) => {
		let out: number[] = [];
		const l = str.length;
		let i = str.indexOf('.');
		while (i < l && i > 0) {
			out.push(+str.substring(0, i));
			str = str.slice(i + 1);
			i = str.indexOf('.');
		} 
		return out;
	}

	const keyValidation = () => {
		if (mod == 1) {
			setInvalidMessage("Must provide valid modulus!");
			return false;
		}
		if (key == 1) {
			setInvalidMessage("Must provide valid key!");
			return false;
		}
		setInvalidMessage("");
		return true;
	}

	const encryptValidation = () => {
		if (!keyValidation()) {
			return false;
		}
		if (message.length === 0) {
			setInvalidMessage("Must provide message!");
			return false;
		}
		for (let i = 0; i < message.length; i++) {
			if (message.charCodeAt(i) > Math.pow(2, 16) - 1) {
				setInvalidMessage("Unable to encrypt special characters!");
				return false;
			}
		}
		return true;
	};

	const decryptValidation = () => {
		if (!keyValidation()) {
			return false;
		}
		let mustSeeNumber: boolean = true;
		for (let i = 0; i < message.length; i++) {
			if (!mustSeeNumber) {
				if (message[i] !== '.' && isNaN(+message[i])) {
					mustSeeNumber = false;
					break;
				}
				if (message[i] === '.') {
					mustSeeNumber = true;
					break;
				}
				continue;
			}
			if (isNaN(+message[i])) {
				mustSeeNumber = false;
				break;
			}
			mustSeeNumber = false;
		}
		if (mustSeeNumber) {
			setInvalidMessage("");
			return true;
		}
		setInvalidMessage("Unable to decrypt!");
		return false;
	}

	const doCrypt = (e: FormEvent) => {
		e.preventDefault();
		switch(mode) {
			case "enc":
				if (encryptValidation()) {
					setCrypt(arrayToString(props.cryptFunc(mod, key, props.encodeFunc(message))));
				}
				break;
			case "dec":
				if (decryptValidation()) {
					setMessage(props.decodeFunc(props.cryptFunc(mod, key, stringToArray(message))));
				}
				break;
		}
	}

	const keyChange = (e: any) => {
		if (e.target.value === "") {
			setKey(1);
		} else {
			setKey(e.target.value);
		}
	}

	const modChange = (e: any) => {
		if (e.target.value === "") {
			setMod(1);
		} else {
			setMod(e.target.value);
		}
	}

	const cryptionForm = (
		<>
			<Form onSubmit={(e: FormEvent) => doCrypt(e)}>
				<Form.Check onClick={() => switchMode("enc")} defaultChecked inline name="edRadio" type="radio" label="Encryption Mode"/>
				<Form.Check onClick={() => switchMode("dec")} inline name="edRadio" type="radio" label="Decryption Mode"/>
				<Form.Group className="cryptBox">
					<Form.Label as="h5">Modulus:</Form.Label>
					<Form.Control placeholder="Enter Modulus" type="number" onChange={(e) => {modChange(e)}}/>
					<Form.Control.Feedback type="invalid" tooltip>
             			"Missing modulus!"
           			</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="cryptBox">
					<Form.Label as="h5">{getKeyName()}:</Form.Label>
					<Form.Control placeholder={`Enter ${getKeyName()}`} type="number" onChange={(e) => {keyChange(e)}}/>
				</Form.Group>
				<Form.Group className="cryptBox">
					<Form.Label as="h5">Message to Encrypt or Decrypt:</Form.Label>
					<Form.Control as="textarea" onChange={(e) => {messageChanged(e)}} value={message}/>
					<Form.Control.Feedback type="invalid">
						Invalid entry, unable to {mode}ypt!
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="cryptBox">
					<div className="d-grid">
						<Button type="submit" variant="success" className="btn-block">
							{getButtonText("crypt")}
						</Button>
					</div>
					{invalidMessage}
				</Form.Group>
				<Form.Group className="cryptBox">
					<Form.Label as="h5">Result:</Form.Label>
					<Form.Control as="textarea" plaintext readOnly value={crypt}/>
					<Form.Text className="text-muted">
						The result of encryption, copy exactly!
					</Form.Text>
				</Form.Group>
				
			</Form>
		</>
	);

	return (
		<>
			{cryptionForm}
		</>
	);
};
