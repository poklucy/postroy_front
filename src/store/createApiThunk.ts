import { createAsyncThunk } from '@reduxjs/toolkit';
import { toRequestError } from '@/api/apiError';
import { RequestError } from '@/types/request.types';

export const createApiThunk = <Returned, Arg = void>(
    type: string,
    request: (arg: Arg) => Promise<Returned>,
    options?: { condition?: (arg: Arg, api: { getState: () => unknown }) => boolean },
) =>
    createAsyncThunk<Returned, Arg, { rejectValue: RequestError }>(type, async (arg, { rejectWithValue }) => {
        try {
            return await request(arg);
        } catch (error) {
            return rejectWithValue(toRequestError(error));
        }
    }, options);

export const getRejectedError = (action: { payload?: RequestError; error: { message?: string } }): RequestError =>
    action.payload ?? { kind: 'unknown', message: action.error.message ?? '' };
