const path = require('path')

module.exports = {
    mode: 'Development',
    entry: './pages/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}