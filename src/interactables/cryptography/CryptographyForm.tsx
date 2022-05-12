import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

export const CryptographyForm = (props: {
		encodeValidation: (message: string) => boolean,
		encodeFunc: (message: string) => number[],
		decodeFunc: (code: number[]) => string,
		cryptFunc: (mod: number, key: number, code: number[]) => number[]}) => {	
	
	const [mode, setMode] = useState("enc");
	const [message, setMessage] = useState("");
	const [crypt, setCrypt] = useState("");
	const [mod, setMod] = useState(1);
	const [key, setKey] = useState(1);

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
				return "En" + base;
			case "dec":
				return "De" + base;
		}
	}

	const switchMode = (newMode: string) => {
		setMode(newMode);
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

	const doCrypt = () => {
		switch(mode) {
			case "enc":
				setCrypt(arrayToString(props.cryptFunc(mod, key, props.encodeFunc(message))));
				break;
			case "dec":
				setMessage(props.decodeFunc(props.cryptFunc(mod, key, stringToArray(message))));
				break;
		}
	}

	const keyChange = (e: any) => {
		setKey(e.target.value);
	}

	const modChange = (e: any) => {
		setMod(e.target.value);
	}

	const keyForm = (
		<>
			<Form>
				<Form.Check onClick={() => switchMode("enc")} inline name="edRadio" type="radio" label="Encryption Mode"/>
				<Form.Check onClick={() => switchMode("dec")} inline name="edRadio" type="radio" label="Decryption Mode"/>
				<Form.Group>
					<Form.Label>Modulus:</Form.Label>
					<Form.Control placeholder="Enter Modulus" type="number" onChange={(e) => {modChange(e)}}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>{getKeyName()}</Form.Label>
					<Form.Control placeholder={`Enter ${getKeyName()}`} type="number" onChange={(e) => {keyChange(e)}}/>
				</Form.Group>
			</Form>
		</>
	);

	const messageForm = (
		<>
			<Form>
				<Form.Group>
					<Form.Label>Message to Encrypt or Decrypt:</Form.Label>
					<Form.Control as="textarea" onChange={(e) => {messageChanged(e)}} value={message}/>
				</Form.Group>
				<Button onClick={() => doCrypt()}>
					{getButtonText("crypt")}
				</Button>
				<Form.Label>Result:</Form.Label>
				<Form.Control as="textarea" plaintext readOnly value={crypt}/>
				<Form.Text className="text-muted">
					The result of encryption, copy exactly!
				</Form.Text>
			</Form>
		</>
	);

	return (
		<>
			<Container>
				<Row>
					{keyForm}
				</Row>
				<Row>
					{messageForm}
				</Row>
			</Container>
		</>
	);
};
