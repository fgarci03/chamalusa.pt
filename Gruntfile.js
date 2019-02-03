'use strict';

var LIVERELOAD_PORT = 35729;


module.exports = function (grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks

  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'docs'
  };


  grunt.initConfig({
    yeoman: yeomanConfig,
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      test: {
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      }

    },
    watch: {
      javascript: {
        files: ['<%= yeoman.app %>/assets/js/custom.js'],
        tasks: ['jshint']
      },
      less: {
        files: ['<%= yeoman.app %>/assets/less/{,*/}*.less'],
        tasks: ['less']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/index.html',
          '{.tmp,<%= yeoman.app %>}/assets/js/custom.js',
          '{.tmp,<%= yeoman.app %>}/assets/css/style.css',
          '<%= yeoman.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    /**
     * Compiling sources
     */
    less: {
      options: {
        paths: ['<%= yeoman.app %>/assets/css'],
        optimization: 0,
        plugins: [
          new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions", 'ie8', 'ie9']})
        ]
      },
      all: {
        files: {
          '<%= yeoman.app %>/assets/css/style.css': '<%= yeoman.app %>/assets/less/main.less'
        }
      }
    },
    cssmin: {
      dist: {
        expand: true,
        cwd: '<%= yeoman.dist %>/assets/css/',
        src: ['style.css'],
        dest: '<%= yeoman.dist %>/assets/css/'
      }
    },
    bowerInstall: {
      target: {
        src: [
          'app/index.html'
        ]
      }
    },
    jshint: {
      all: [
        'app/assets/js/custom.js'
      ]
    },

    /**
     * Scripts
     */
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/assets/js/scripts.js': ['<%= yeoman.dist %>/assets/js/scripts.js']
        }
      }
    },

    /**
     * Performance optimization
     */
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {'js': ['concat'], 'css': ['concat']},
            post: []
          }
        }
      },
      html: ['<%= yeoman.app %>/index.html']
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>'],
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/index.html'],
      css: ['<%= yeoman.dist %>/assets/css/style.css']
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/assets/img',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/assets/img'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/assets/img/marcas',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/assets/img/marcas'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/assets/img/servicos',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/assets/img/servicos'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: 'index.html',
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    /**
     * File based Cache busting
     */
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/assets/js/custom.js',
            '<%= yeoman.dist %>/assets/css/style.css'
          ]
        }
      }
    },

    /**
     * Copy && Concurrent
     */
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,html,txt,xml}'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/bower_components/font-awesome/',
            dest: '<%= yeoman.dist %>/assets/',
            src: [
              'fonts/*'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/bower_components/bootstrap/',
            dest: '<%= yeoman.dist %>/assets/',
            src: [
              'fonts/*'
            ]
          }
        ]
      }
    },
    concurrent: {
      server: [
        'less'
      ],
      dist: [
        'less',
        'imagemin'
      ]
    },

    /**
     * Server
     */
    open: {
      app: {
        path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    },
    connect: {
      options: {
        port: 8085,
        hostname: 'localhost'
      },
      server: {
        options: {
          base: 'app',
          livereload: true
        }
      }
    }
  });


  grunt.registerTask('serve', [
    'clean:server',
    'bowerInstall',
    'concurrent:server',
    'connect:server',
    'open:app',
    'watch'
  ]);


  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'concurrent:dist',
    'copy:dist',
    'useminPrepare',
    'concat:generated',
    'uglify',
    'cssmin',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
