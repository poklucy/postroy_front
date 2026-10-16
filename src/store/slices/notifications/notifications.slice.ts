import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type ToastTone = 'success' | 'warning';

export interface Toast {
    id: string;
    message: string;
    tone: ToastTone;
    link?: { to: string; label: string };
}

interface NotificationsState {
    toast: Toast | null;
}

const initialState: NotificationsState = { toast: null };

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showToast: {
            reducer: (state, action: PayloadAction<Toast>) => {
                state.toast = action.payload;
            },
            prepare: (toast: Omit<Toast, 'id' | 'tone'> & { tone?: ToastTone }) => ({
                payload: { tone: 'success' as ToastTone, ...toast, id: nanoid() },
            }),
        },
        hideToast: (state, action: PayloadAction<string>) => {
            if (state.toast?.id === action.payload) state.toast = null;
        },
    },
});

export const { showToast, hideToast } = notificationsSlice.actions;
export default notificationsSlice.reducer;
