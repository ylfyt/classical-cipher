export const getFileNameInfo = (
	filename: string
): {
	filename: string;
	extension: string;
} => {
	const data = filename.split('.');
	let temp: string = '';
	for (let i = 0; i < data.length - 1; i++) {
		temp += data[i];
	}
	return {
		extension: data[data.length - 1] ?? '',
		filename: temp,
	};
};
