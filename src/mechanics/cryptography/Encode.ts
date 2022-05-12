const encodeFunc = (message: string) => {
	let code: number[] = [];
	console.log(message);
	for (let i = 0; i < message.length; i++) {
		let s = message.charCodeAt(i);
		let r = Math.floor(Math.random() * Math.pow(2, 16));
		s = (s + r) % Math.pow(2, 16);
		code.push(+numberConcat(s, r));
	}
	console.log("encoded = " + code);
	return code;
};

const encodeValidation = (code: string) => {
	for (let i = 0; i < code.length; i++) {
		if (code.charCodeAt(i) > Math.pow(2, 16) - 1) {
			return false;
		}
	}
	return true;
};

const numberConcat = (x: number, y: number) => {
	let out = "";
	if (y < 10000) {
		out += "0";
	}
	if (y < 1000) {
		out += "0";
	}
	if (y < 100) {
		out += "0";
	}
	if (y < 10) {
		out += "0";
	}
	out += y.toString();
	return x.toString() + out;
};

export { encodeFunc as encodeFunc, encodeValidation as encodeValidation };
