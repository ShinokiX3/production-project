import path from 'path';
import { BuildPaths } from '../build/types/config';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSVGLoader } from '../build/loaders/buildSVGLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: ''
    }

    // config.resolve?.modules?.push(paths.src);
    config.resolve?.modules?.unshift(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');

    if (config.module?.rules) {
        config.module.rules = config.module.rules
        .map((rule: false | "" | 0 | RuleSetRule | "..." | null | undefined) => {
            if (typeof rule === 'object' && rule !== null && /svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg/i }
            }
    
            return rule;
        })
    }

    config.module?.rules?.push(buildSVGLoader());
    config.module?.rules?.push(buildCssLoader(true));

    config.plugins?.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
}