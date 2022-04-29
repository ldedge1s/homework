const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader'}
            }
        ]
    },
    mode: 'development',
    devServer: {
        devMiddleware: {
            index: true,
            publicPath: '/public',
            writeToDisk: true,
        },
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.get(`/api/purchase/history/:start/:end`, (req, res) => {
                //network latency simulation
                setTimeout(() => {
                    const mockPayments = require('./mockApi/clientPurchaseHistory.mock').clientPurchaseHistoryMockData;

                    res.send(mockPayments.filter(payment => {
                        const month = new Date(payment.ts).getMonth();
                        const { start, end } = req.params;

                        return month >= start && month <= end;
                    }));
                }, 500);
            });

            return middlewares;
        },
        static: [
            {
                directory: path.join(__dirname, 'public'),
            },
            {
                directory: path.join(__dirname, 'dist'),
            }
        ],
        port: 9000,
        hot: true,
    }
};
