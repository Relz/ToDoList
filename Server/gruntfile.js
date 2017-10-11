module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ts: {
			default: {
				src    : ['src/ts/*.ts'],
				outDir : 'build/',
				options: {
					configFile: 'tsconfig.json'
				}
			}
		},

		tslint: {
			options :
				{
					configFile: 'tslint.json'
				},
			validate: ['src/**/*.ts']
		},

		spell: {
			all: {
				src: ['src/ts/*'],
				options: {
					lang: 'en',
					stderr: true
				}
			}
		},

		clean: {
			build: {
				build  : ['build'],
				tscache: ['.tscache'],
				logs   : ['*.log']
			}
		},

		shell: {
			run_server: {
				command: 'node build/server.js',
				options: {
					stderr: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-spell');

	grunt.registerTask('build', [
		'clean:build',
		'ts',
		'shell:run_server'
	]);
	grunt.registerTask('validate', [
		'tslint',
		'spell'
	]);
};
