export const cryptFunc = (mod: number, pow: number, code: number[]) => {
	let crypt: number[] = [];	
	for (let i in code) {
		crypt[i] = modPow(mod, pow, code[i]);
	}
	return crypt;
}

const modPow = (mod: number, pow: number, x: number) => {
	let powTwoPows: number[] = [x];
	let i = 0;
	let p = 2;
	while (p <= pow) {
		powTwoPows.push(modMult(powTwoPows[i], powTwoPows[i], mod));
		i++;
		p = p * 2;
	}
	i = 0;
	let out = 1;
	while (pow > 0) {
		if (pow % 2 == 1) {
			out = modMult(out, powTwoPows[i], mod);
		}
		pow = Math.floor(pow / 2);
		i++;
	}
	return out;
};

const modMult = (x: number, y: number, mod: number) => {
	let powTwoProds: number[] = [x];
	let i = 0;
	let p = 2;
	while (p <= y) {
		powTwoProds.push((powTwoProds[i] + powTwoProds[i]) % mod);
		i++;
		p = p * 2;
	}
	i = 0;
	let out = 0;
	while (y > 0) {
		if (y % 2 == 1) {
			out = (out + powTwoProds[i]) % mod;
		}
		y = Math.floor(y / 2);
		i++;
	}
	return out;
};