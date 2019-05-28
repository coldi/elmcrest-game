const path = require('path');

module.exports = {
    presets: ['react', 'sass'],
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
                'import/no-useless-path-segments': 'off',
                'react/destructuring-assignment': 'off',
                'react/jsx-wrap-multilines': 'off',
                'import/prefer-default-export': 'off',
                'import/no-cycle': 'off',
                'jsx-a11y/click-events-have-key-events': 'off',
                'jsx-a11y/no-static-element-interactions': 'off',
                'lines-between-class-members': 'off',
                'jsx-a11y/no-noninteractive-element-interactions': 'off',
                'react/no-array-index-key': 'off',
                'prefer-destructuring': 'off',
                'react/default-props-match-prop-types': 'off',
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
                rules: rules => [...rules, { test: /\.(glsl)$/, use: 'raw-loader' }],
            },
            output: {
                globalObject: 'this'
            }
        },
    }),
};
