import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

export type Selector<T> = (state: StateSchema) => T;
export type Result<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): Result<T> {
	const useSelctorHook = () => useSelector(selector);

	return [useSelctorHook, selector];
}
