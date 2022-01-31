const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/viewport-helper.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'viewport-helper.min.js',
    },
};