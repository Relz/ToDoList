module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default: {
                src: ['src/ts/*.ts'],
                outDir: 'build/',
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        },

        tslint: {
            options:
                {
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
            cspell: {
                command: 'cspell src/**/*.ts',
                options: {
                    stderr: true
                }
            },
            run_server: {
                command: 'node build/server.js',
                options: {
                    stderr: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts'),
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', [
        'clean:build',
        'ts',
        'shell:run_server'
    ]);
    grunt.registerTask('validate', [
        'tslint',
        'shell:cspell'
    ]);
};
