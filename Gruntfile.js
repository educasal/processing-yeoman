'use strict';

module.exports = function (grunt) {
  
  require('time-grunt')(grunt);
  
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies',
    config: 'package.json',
    pattern: ['grunt-*']
  });
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'src/**/*.js',
        'example/app.js',
        'Gruntfile.js'
      ]
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true,
        sourceMapName: 'dist/processing-yeoman.min.map'
      },
      myTarget: {
        files: {
          'dist/processing-yeoman.min.js': ['src/processing-yeoman.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['src/processing-yeoman.js'], dest: 'dist/processing-yeoman.js'},
          {src: ['dist/processing-yeoman.min.js'], dest: 'example/processing-yeoman.min.js'},
          {src: ['dist/processing-yeoman.min.map'], dest: 'example/processing-yeoman.min.map'},
          {src: ['bower_components/jquery/jquery.min.js'], dest: 'example/jquery.min.js'},
          {src: ['bower_components/jquery/jquery.min.map'], dest: 'example/jquery.min.map'}
        ]
      }
    },
    jsdoc : {
      dist : {
        src: ['src/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },
    jscs: {
      src: ['src/**/*.js', 'Gruntfile.js', 'example/app.js'],
      options: {
        config: '.jscs.json'
      }
    },
    version: {
      js: {
        options: {
          prefix: '@version\\s*'
        },
        src: ['src/**/*.js']
      },
      json: {
        options: {
          prefix: '"version":\\s"*'
        },
        src: ['bower.json']
      }
    }
  });
  
  //grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('build', [
    'version:js',
    'version:json',
    'jshint',
    'jscs',
    'uglify',
    'copy:main',
    'jsdoc:dist'
  ]);
  
  grunt.registerTask('serve', ['build']);
  grunt.registerTask('default', ['build']);
};
