import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Args = any[];

export type Selector<T, A extends Args> = (state: StateSchema, ...args: A) => T;
export type Hook<T, A extends Args> = (...args: A) => T;
export type Result<T, A extends Args> = [Hook<T, A>, Selector<T, A>];

export function buildSelector<T, A extends Args>(selector: Selector<T, A>): Result<T, A> {
    const useSelctorHook: Hook<T, A> = (...args: A) => 
        useSelector((state: StateSchema) => selector(state, ...args));

    return [useSelctorHook, selector];
}
