export const dataCleaner = (data: number[], base: number) => {
	const temp: number[] = [];
	for (let i = 0; i < data.length; i++) {
		const char = data[i] - base;
		if (char < 26 && char >= 0) {
			temp.push(char + base);
		}
	}
	return temp;
};
