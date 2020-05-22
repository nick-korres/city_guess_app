const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
  

module.exports = (env) => {
      // create a nice object from the env variable
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    return{
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js'
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: { loader: 'file-loader'}
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                { 
                    test:  /\.js$/i, 
                    exclude: /node_modules/,
                    use: { loader: 'babel-loader' }
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({ template: './src/index.html' })
        ]
    }
}
