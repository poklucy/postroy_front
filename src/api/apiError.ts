import { AxiosError, isAxiosError } from 'axios';
import { ErrorKind, RequestError } from '@/types/request.types';

export class ApiError extends Error {
    readonly kind: ErrorKind;
    readonly status?: number;

    constructor(kind: ErrorKind, message = '', status?: number) {
        super(message || kind);
        this.name = 'ApiError';
        this.kind = kind;
        this.status = status;
    }
}

export const kindFromStatus = (status: number): ErrorKind => {
    if (status === 400 || status === 422) return 'validation';
    if (status === 401) return 'unauthorized';
    if (status === 403) return 'forbidden';
    if (status === 404 || status === 410) return 'not_found';
    if (status === 408) return 'timeout';
    if (status === 429) return 'rate_limit';
    if (status >= 500) return 'server';
    return 'unknown';
};

const isOffline = () => typeof navigator !== 'undefined' && navigator.onLine === false;

const fromAxiosError = (error: AxiosError): ApiError => {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return new ApiError('timeout', error.message);
    if (!error.response) return new ApiError(isOffline() ? 'network' : 'server', error.message);
    const { status } = error.response;
    return new ApiError(kindFromStatus(status), error.message, status);
};

export const toApiError = (error: unknown): ApiError => {
    if (error instanceof ApiError) return error;
    if (isAxiosError(error)) return fromAxiosError(error);
    if (error instanceof DOMException && (error.name === 'AbortError' || error.name === 'TimeoutError')) {
        return new ApiError('timeout', error.message);
    }
    if (error instanceof TypeError) return new ApiError('network', error.message);
    return new ApiError('unknown', error instanceof Error ? error.message : String(error));
};

export const toRequestError = (error: unknown): RequestError => {
    const { kind, message, status } = toApiError(error);
    return { kind, message, status };
};
