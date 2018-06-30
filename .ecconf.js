const path = require('path');

module.exports = {
    presets: ['react'],
    options: ({ options }) => ({
        title: 'React App',
        entryFiles: {
            main: [
                // dev entries will be injected here ...
                `./${options.srcDir}/index.js`,
            ],
            pathfinder: `./${options.srcDir}/modules/pathfinder/worker.js`,
        },
        browserList: ['last 2 versions', 'not ie < 11'],
    }),
    addons: () => ({
        eslint: {
            rules: {
                'comma-dangle': 'off',
                'no-multi-assign': 'off',
                'global-require': 'off',
                'no-restricted-syntax': 'off',
                'no-confusing-arrow': 'off',
                'import/no-dynamic-require': 'off',
                'react/no-unused-prop-types': 'off',
                'react/forbid-prop-types': 'off',
            },
        },
    }),
    runners: ({ options }) => ({
        webpack: {
            resolve: {
                alias: {
                    assets: path.resolve(options.srcDir, 'assets'),
                    modules: path.resolve(options.srcDir, 'modules'),
                    scripts: path.resolve(options.srcDir, 'scripts'),
                },
            },
            module: {
                rules: (rules) => [
                    ...rules,
                    { test: /\.(glsl)$/, use: 'raw-loader' },
                ]
            }
        },
        jest: {
            setupTestFrameworkScriptFile: require.resolve('./jestTestSetup'),
            moduleNameMapper: {
                '^assets(.*)$': `<rootDir>/${options.srcDir}/assets$1`,
                '^modules(.*)$': `<rootDir>/${options.srcDir}/modules$1`,
                '^scripts(.*)$': `<rootDir>/${options.srcDir}/scripts$1`,
            },
        },
    }),
};
