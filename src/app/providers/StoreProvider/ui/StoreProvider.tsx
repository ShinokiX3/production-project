import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props;

	const store = createReduxStore(initialState as StateSchema);

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};
