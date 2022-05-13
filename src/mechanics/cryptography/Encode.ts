export const encodeFunc = (message: string) => {
	let code: number[] = [];
	for (let i = 0; i < message.length; i++) {
		let s = message.charCodeAt(i);
		let r = Math.floor(Math.random() * Math.pow(2, 16));
		s = (s + r) % Math.pow(2, 16);
		code.push(+numberConcat(s, r));
	}
	return code;
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
