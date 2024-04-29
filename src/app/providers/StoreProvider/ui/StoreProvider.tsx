import { Provider } from 'react-redux';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState, asyncReducers } = props;

	const store = createReduxStore(
		initialState as StateSchema,
		asyncReducers as ReducersMapObject<StateSchema>
	);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
