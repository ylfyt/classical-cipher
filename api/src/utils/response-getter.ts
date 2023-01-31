import { IResponseDTO } from '../dtos/response-dto.js';

export const getSuccessResponse = (data: any): IResponseDTO => {
	return {
		message: '',
		status: 200,
		success: true,
		data,
	};
};
export const getErrorResponse = (status: number, message: string): IResponseDTO => {
	return {
		message,
		status,
		success: false,
	};
};
