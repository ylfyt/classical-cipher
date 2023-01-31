import express from 'express';
import { Request } from 'express';
import { ciphers } from './algorithms/ciphers.js';
import { IRequestDTO } from './dtos/request-dto.js';
import { IResponseDTO } from './dtos/response-dto.js';
import { getErrorResponse, getSuccessResponse } from './utils/response-getter.js';

const app = express();
app.use(express.json());

app.post('/encrypt/:alg', (req: Request<any, IResponseDTO, IRequestDTO>, res) => {
	const alg = req.params.alg;
	const cipher = ciphers.get(alg);
	if (!cipher) {
		return res.status(400).json(getErrorResponse(400, 'Algorithm not found'));
	}
	const dto = req.body;

	if (typeof dto.key !== 'object' || dto.key.length === 0) return res.status(400).json(getErrorResponse(400, 'Key is required'));
	if (typeof dto.data !== 'object' || dto.data.length === 0) return res.status(400).json(getErrorResponse(400, 'Data is required'));

	const result = cipher.encrypter(dto.data, dto.key);
	res.send(getSuccessResponse(result));
});

app.post('/decrypt/:alg', (req: Request<any, IResponseDTO, IRequestDTO>, res) => {
	const alg = req.params.alg;
	const cipher = ciphers.get(alg);
	if (!cipher) {
		return res.status(400).json(getErrorResponse(400, 'Algorithm not found'));
	}
	const dto = req.body;

	if (typeof dto.key !== 'object' || dto.key.length === 0) return res.status(400).json(getErrorResponse(400, 'Key is required'));
	if (typeof dto.data !== 'object' || dto.data.length === 0) return res.status(400).json(getErrorResponse(400, 'Data is required'));

	const result = cipher.decrypter(dto.data, dto.key);
	res.send(getSuccessResponse(result));
});

app.listen(4001, () => {
	console.log('Server is listening on port', 4001);
});
