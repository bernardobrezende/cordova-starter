'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
	  protractor: {
      run: {
        options: {
          configFile: "protractor.conf.js", // Default config file 
          keepAlive: false, // If false, the grunt process stops when the test fails. 
          noColor: false, // If true, protractor will not use colors in its output. 
        }  
      }  
	  },
	  connect: {
      local: {
        port: 9000,
        base: 'www'
      }
    },
  	protractor_webdriver: {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },
    concurrent: {
      test: {
        tasks: [ 'connect:local', 'protractor_webdriver', 'protractor' ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('test', ['concurrent:test']);
  grunt.registerTask('s', ['connect:local']);

};