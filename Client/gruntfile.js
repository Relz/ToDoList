module.exports = function(grunt) {
	var path = require('path');
	var cspellPath = path.resolve('node_modules/.bin/cspell');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		tslint: {
			options: {
				configFile: 'tslint.json'
			},
			validate: ['src/**/*.ts', 'src/**/*.tsx']
		},

		shell: {
			compile: {
				command: 'webpack --colors'
			},
			compile_and_run: {
				command: 'webpack-dev-server --colors --content-base  build/'
			},
			cspell: cspellPath + ' ' + '-c' + ' ' + 'cspell.config.json' + ' ' + 'src/**/*'
		}
	});

	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('compile', [
		'shell:compile'
	]);

	grunt.registerTask('compile_and_run', [
		'shell:compile_and_run'
	]);

	grunt.registerTask('validate', [
		'tslint',
		'shell:cspell'
	]);
};
