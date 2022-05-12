export const keyGen = () => {
	const findPrimesAbove = 1000000;
	const n = findPrimesAbove + Math.round(findPrimesAbove * Math.random());
	const p = firstPrimeAfterN(n);
	const q = firstPrimeAfterN(10 * n);
	const m = p * q;
	const m1 = (p - 1) * (q - 1);
	let d = firstPrimeAfterN(m1 + findPrimesAbove + Math.round(findPrimesAbove * Math.random())) % m1;
	let e = getInverse(m1, d);
	while (e < 0) {
		e += m1;
	}
	e = e % m1;
	return [m, e, d];
};

const getInverse = (m: number, b: number) => {
	let qs: number[] = [];
	let r = m % b;
	let lastr = r;
	qs.push(Math.floor(m / b));
	while (true) {
		m = b;
		b = lastr;
		r = m % b;
		qs.push(Math.floor(m / b));
		if (r == 1) {
			break;
		}
		lastr = r;
	}
	let out = 1;
	let lastOut = 1;
	let lastLastOut = 0;
	for (let i = qs.length - 1; i >= 0; i--) {
		out = (-1 * qs[i] * lastOut) + lastLastOut;
		lastLastOut = lastOut;
		lastOut = out;
	}
	return out;
};

const gcd = (a: number, b: number) => {
	if (a % b == 0) {
		return b;
	}
	if (b % a == 0) {
		return a;
	}
	let r = a % b;
	let lastr = r;
	while (true) {
		a = b;
		b = lastr;
		r = a % b;
		if (r == 0) {
			return lastr;
		}
		lastr = r;
	}
};

const firstPrimeAfterN = (n: number) => {
	if (n % 2 === 0) {
		n += 1;
	}
	while (true) {
		if (n % 3 !== 0 && n % 5 !== 0) {
			let k = 6;
			let prime = true;
			while (k * k <= n) {
				if (n % (k + 1) === 0 || n % (k + 5) === 0) {
					prime = false;
					break;
				}
				k += 6;
			}
			if (prime) {
				return n;
			}
		}
		n += 2;
	}
};