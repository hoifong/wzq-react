const { override, addWebpackAlias, overrideDevServer } = require('customize-cra');
const path = require('path');

module.exports = {
    webpack: override(
        addWebpackAlias({
            "@": path.resolve(__dirname, 'src'),
            "icon": path.resolve(__dirname, 'src/assets/icon'),
            "img": path.resolve(__dirname, 'src/assets/img'),
            "types": path.resolve(__dirname, 'src/types'),
            "consts": path.resolve(__dirname, 'src/utils/consts.ts'),
            "api": path.resolve(__dirname, 'src/api')
        })
    ),
    devServer: overrideDevServer(
        config => ({
            ...config,
            port: 8500,
            proxy: {
                /**
                 * 代理
                 */
            }
        })
    )
}