const path = require('path');

const config = {
    verbose: true,
    setupFilesAfterEnv : [
        path.resolve(__dirname, 'src/setupTests.js')
    ]
};

module.exports = config;
