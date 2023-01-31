export function jsonParse<T>(data: string): T | undefined {
	try {
		const val = JSON.parse(data) as T;
		return val;
	} catch (err) {
		console.log('err', err);
	}
}
