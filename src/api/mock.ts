import { ErrorKind } from '@/types/request.types';
import { delay } from '@/utils/helpers';
import { ApiError } from './apiError';

export type MockScope =
    | 'catalog'
    | 'category'
    | 'products'
    | 'product'
    | 'related'
    | 'search'
    | 'auth'
    | 'checkout'
    | 'contact';

const STORAGE_KEY = 'postroy_mock_errors';
const QUERY_KEY = 'mock_error';

const ERROR_KINDS: ErrorKind[] = [
    'network', 'timeout', 'not_found', 'unauthorized', 'forbidden', 'validation', 'rate_limit', 'server', 'unknown',
];

const readConfig = (): string => {
    try {
        const fromQuery = new URLSearchParams(window.location.search).get(QUERY_KEY);
        return fromQuery ?? localStorage.getItem(STORAGE_KEY) ?? '';
    } catch {
        return '';
    }
};

const getSimulatedError = (scope: MockScope): ErrorKind | null => {
    const entries = readConfig().split(',').map(entry => entry.trim()).filter(Boolean);

    for (const entry of entries) {
        const [target, kind = 'server'] = entry.split(':');
        if ((target === scope || target === 'all') && ERROR_KINDS.includes(kind as ErrorKind)) {
            return kind as ErrorKind;
        }
    }
    return null;
};

export const mockRequest = async <T>(scope: MockScope, ms: number, resolve: () => T): Promise<T> => {
    await delay(ms);

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        throw new ApiError('network', 'Network is offline');
    }

    const simulated = getSimulatedError(scope);
    if (simulated) throw new ApiError(simulated, `Simulated ${simulated} error`);

    return resolve();
};
