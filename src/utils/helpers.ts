export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
