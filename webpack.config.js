const path = require('path');

module.exports = {
    entry: './dist/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve()
    }
};
