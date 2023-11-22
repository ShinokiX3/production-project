import { ResolveOptions } from 'webpack';

export function buildResolvers(): ResolveOptions {
	return {
		extensions: ['.txs', '.ts', '.js'],
	};
}
