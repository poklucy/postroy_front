export type ErrorKind =
    | 'network'
    | 'timeout'
    | 'not_found'
    | 'unauthorized'
    | 'forbidden'
    | 'validation'
    | 'rate_limit'
    | 'server'
    | 'unknown';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface RequestError {
    kind: ErrorKind;
    message: string;
    status?: number;
}

export interface RequestState {
    status: RequestStatus;
    error: RequestError | null;
}

export const IDLE_REQUEST: RequestState = { status: 'idle', error: null };
