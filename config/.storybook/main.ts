import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSVGLoader } from '../build/loaders/buildSVGLoader';
import { BuildPaths } from '../build/types/config';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';

module.exports = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        'storybook-addon-themes',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config: webpack.Configuration) => {
        const paths: BuildPaths = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            locales: '',
            buildLocales: '',
        };

        // config.resolve?.modules?.push(paths.src);
        config.resolve?.modules?.unshift(paths.src);
        config.resolve?.extensions?.push('.ts', '.tsx');
        config!.resolve!.alias = {
            ...config?.resolve?.alias,
            '@': paths.src,
        };

        if (config.module?.rules) {
            config.module.rules = config.module.rules.map(
                (
                    rule:
                        | false
                        | ''
                        | 0
                        | RuleSetRule
                        | '...'
                        | null
                        | undefined,
                ) => {
                    if (
                        typeof rule === 'object' &&
                        rule !== null &&
                        /svg/.test(rule.test as string)
                    ) {
                        return { ...rule, exclude: /\.svg/i };
                    }

                    return rule;
                },
            );
        }

        config.module?.rules?.push(buildSVGLoader());
        config.module?.rules?.push(buildCssLoader(true));

        config.plugins?.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('https://testapi.ru'),
                __PROJECT__: JSON.stringify('storybook'),
            }),
        );

        return config;
    },
};
