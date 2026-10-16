import { ApiError, kindFromStatus, toApiError } from './apiError';

const REQUEST_TIMEOUT = 15000;

export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(new DOMException('Request timeout', 'TimeoutError')), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        if (!response.ok) {
            throw new ApiError(kindFromStatus(response.status), response.statusText, response.status);
        }
        return (await response.json()) as T;
    } catch (error) {
        throw toApiError(error);
    } finally {
        clearTimeout(timer);
    }
};
