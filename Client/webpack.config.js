const path = require("path");

module.exports = {
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	entry: "./src/index.tsx",

	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},

	devServer: {
		historyApiFallback: true
	},

	devtool: "source-map",

	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.sass$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.css/,
				loaders: ["style-loader", "css-loader"]
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
				loader: "file-loader"
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};
