import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Request } from 'express';
import { ciphers } from './algorithms/ciphers.js';
import { IRequestDTO } from './dtos/request-dto.js';
import { IResponseDTO } from './dtos/response-dto.js';
import { getErrorResponse, getSuccessResponse } from './utils/response-getter.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());
app.use(upload.single('file'));

app.post('/:action/:alg', (req: Request<any, IResponseDTO, IRequestDTO>, res) => {
	const action = req.params.action;
	if (action !== 'encrypt' && action !== 'decrypt') return res.status(404).json(getErrorResponse(404, 'Action should be encrypt or decrypt'));

	const alg = req.params.alg;
	const cipher = ciphers.get(alg);
	if (!cipher) return res.status(400).json(getErrorResponse(400, 'Algorithm not found'));

	const key = req.body.key;
	if (!key || key.length === 0) return res.status(400).json(getErrorResponse(400, 'Key is required'));

	const buff = req.file?.buffer;
	if (!buff || buff.length === 0) return res.status(400).json(getErrorResponse(400, 'Data is required'));

	try {
		const data = new Uint8Array(buff!);

		const resolver = action === 'encrypt' ? cipher.encrypter : cipher.decrypter;

		const result = resolver(data, key);
		res.send(getSuccessResponse(result));
	} catch (error) {
		const err = error as Error;
		res.status(400).send(getErrorResponse(400, err.message));
	}
});

app.listen(4001, () => {
	console.log('Server is listening on port', 4001);
});
