export const decodeFunc = (code: number[]) => {
	let message: string = "";
	for (let x of code) {
		message += getChar(getNumPair(x));
	}
	return message;
};

const getNumPair = (concat: number) => {
	let numPair: number[] = [0, 0];
	numPair[0] = Math.floor(concat / 100000);
	numPair[1] = concat % 100000;
	return numPair;
};

const getChar = (numPair: number[]) => {
	let j = numPair[0] - numPair[1];
	j = j < 0 ? j + Math.pow(2,16) : j % Math.pow(2,16);
	return String.fromCharCode(j);
}
