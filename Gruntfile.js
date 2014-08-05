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
                files: ['<%= config.src %>/{content,data,bonnet}/{,*/}*.{md,hbs,yml}'],
                tasks: ['assemble']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dist %>/{,*/}*.html',
                    '<%= config.dist %>/assets/{,*/}*.css',
                    '<%= config.dist %>/assets/{,*/}*.js',
                    '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
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
                layoutdir: '<%= config.src %>/bonnet/layouts/',
                partials: '<%= config.src %>/bonnet/partials/**/*.hbs',
                helpers: '<%= config.src %>/bonnet/helpers/**/*.js',
                assets: '<%= config.dist %>/assets'
            },

            pages: {
                files: [
                    {
                        // any files not in the _pages directory
                        cwd: '<%= config.src %>/content/',
                        dest: '<%= config.dist %>/',
                        expand: true,
                        src: ['**/*.hbs', '**/*.md', '!_pages/*']
                    },
                    {
                        // files in the _pages directory
                        cwd: '<%= config.src %>/content/_pages/',
                        dest: '<%= config.dist %>/',
                        expand: true,
                        src: ['**/*.hbs', '**/*.md']
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
                    }
                ]
            }
        },

        exec: {
            // push contents of /dist (on assemble branch) to origin master
            deploy: {
                cmd: 'git subtree push --prefix dist origin master'
            }
        },

        aws: grunt.file.readJSON('grunt-aws.json'),

        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: '<%= aws.bucket %>',
                access: 'public-read',
                headers: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    "Cache-Control": "max-age=630720000, public",
                    "Expires": new Date(Date.now() + 63072000000).toUTCString()
                }
            },
            dev: {
                upload: [{
                    //verify: true,
                    src: '<%= config.dist %>/**',
                    dest: '',
                    rel: '<%= config.dist %>'
                }]
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-s3');

    grunt.registerTask('server', [
        'clean',
        'assemble',
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

    grunt.registerTask('sync', [
        'build',
        's3:dev'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
