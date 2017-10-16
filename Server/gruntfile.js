module.exports = function (grunt) {
	var path = require('path');
	var cspellPath = path.resolve('node_modules/.bin/cspell');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ts: {
			default: {
				src: ['src/**/*.ts'],
				outDir: 'build/',
				options: {
					rootDir: './src',
					configFile: 'tsconfig.json'
				}
			}
		},

		tslint: {
			options: {
				configFile: 'tslint.json'
			},
			validate: ['src/**/*.ts']
		},

		clean: {
			build: {
				build: ['build'],
				tscache: ['.tscache'],
				logs: ['*.log']
			}
		},

		shell: {
			run_server: {
				command: 'node build/ts/server.js',
				options: {
					stderr: true
				}
			},
			cspell: cspellPath + ' ' + '-c' + ' ' + 'cspell.config.json' + ' ' + 'src/**/*',
			test: {
				command: function() {
					var file = process.env.npm_config_file;
					var filePattern;
					if (file !== undefined) {
						filePattern = 'src/test/' + file + '.test.ts';
						if (!grunt.file.exists(filePattern)) {
							grunt.fail.fatal('File "' + filePattern + '" doesn\'t exists');
						}
					} else {
						filePattern = 'src/test/*.test.ts';
					}

					return 'mocha --require ts-node/register ' + filePattern;
				}
			},
			test_coverage: {
				command: function() {
					var file = process.env.npm_config_file;
					var filePattern;
					if (file !== undefined) {
						filePattern = 'build/test/' + file + '.test.js';
						if (!grunt.file.exists(filePattern)) {
							grunt.fail.fatal('File "' + filePattern + '" doesn\'t exists');
						}
					} else {
						filePattern = 'build/test/*.test.js';
					}

					var viewCoverageInWebBrowser = '';
					var webBrowser = process.env.npm_config_web_browser;
					if (webBrowser !== undefined) {
						viewCoverageInWebBrowser = '&&' + ' \"' + webBrowser + '\" coverage/index.html';
					}

					return 'istanbul cover --report html' + ' '
						+ 'node_modules/mocha/bin/_mocha ' + filePattern + ' '
						+ '&&' + ' ' + 'remap-istanbul -i coverage/coverage.json -t html -o coverage' + ' '
						+ viewCoverageInWebBrowser;
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('compile', [
		'clean:build',
		'ts'
	]);

	grunt.registerTask('compile_and_run', [
		'compile',
		'shell:run_server'
	]);

	grunt.registerTask('validate', [
		'tslint',
		'shell:cspell'
	]);

	grunt.registerTask('test', [
		'shell:test'
	]);

	grunt.registerTask('test_coverage', [
		'compile',
		'shell:test_coverage'
	]);
};
