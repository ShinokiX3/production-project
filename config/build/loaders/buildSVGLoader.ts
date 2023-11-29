export function buildSVGLoader() {
	return {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};
}
