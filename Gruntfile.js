'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist'
        },

        watch: {
            assemble: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['<%= config.src %>/{content,data,layouts,partials}/{,*/}*.{md,hbs,yml}'],
                tasks: ['build']
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        assemble: {
            options: {
                collections: [{
                    name: 'post',
                    sortby: 'posted',
                    sortorder: 'descending'
                }],
                data: '<%= config.src %>/data/*.{json,yml}',
                layout: 'default.hbs',
                layoutdir: '<%= config.src %>/layouts/',
                partials: '<%= config.src %>/partials/**/*.hbs',
                helpers: ['helper-moment', '<%= config.src %>/helpers/**/*.js'],
                assets: '<%= config.dist %>/assets',
                lib: '<%= config.dist %>/lib'
            },

            pages: {
                files: [
                    {
                        // any files not in the 'pages' or 'data' directories
                        cwd: '<%= config.src %>/content/',
                        dest: '<%= config.dist %>/',
                        expand: true,
                        src: ['**/*.hbs', '**/*.md', '!pages/*', '!data/*']
                    },
                    {
                        // files in the 'pages' directory
                        cwd: '<%= config.src %>/content/pages/',
                        dest: '<%= config.dist %>/',
                        expand: true,
                        src: ['**/*.hbs', '**/*.md']
                    }
                ]
            },

            data: {
                options: { ext: '.json' },
                files: [
                    {
                        // files in the 'data' directory
                        cwd: '<%= config.src %>/content/',
                        dest: '<%= config.dist %>/',
                        expand: true,
                        src: ['**/*.hbs', '**/*.md', '!pages/*']
                    }
                ]
            }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.dist %>/*'],

        copy: {
            assets: {
                files: [
                    {
                        cwd: '<%= config.src %>/assets',
                        expand: true,
                        src: ['**'],
                        dest: '<%= config.dist %>/assets'
                    },
                    {
                        cwd: '<%= config.src %>/lib',
                        expand: true,
                        flatten: true,
                        src: [
                            '**/jquery.min.js',
                            '**/jquery.min.map',
                            '**/handlebars.min.js',
                            '**/ember.min.js',
                            '**/ember-template-compiler.js'
                        ],
                        dest: '<%= config.dist %>/lib'
                    }
                ]
            }
        },

        exec: {
            // push contents of /dist (on assemble branch) to origin master
            deploy: {
                cmd: 'git subtree push --prefix dist origin master'
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', [
        'build',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'assemble',
        'copy:assets'
    ]);

    grunt.registerTask('deploy', [
        'exec:deploy'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
