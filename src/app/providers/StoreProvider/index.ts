import type { ReduxStoreWithManager, ThunkConfig } from './config/StateSchema';

export type { StateSchema } from './config/StateSchema';
export type { AppDispatch } from './config/store';

export { StoreProvider } from './ui/StoreProvider';
export { createReduxStore } from './config/store';

export {
	ReduxStoreWithManager,
	ThunkConfig
};
