export { default } from './notifications.slice';
export * from './notifications.slice';

import type { RootState } from '@/store';
export const selectToast = (state: RootState) => state.notifications.toast;
