module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/!(lib)/*.js']
    },
    concat: {
      'dest/qmote-client.js': ['src/lib/qrcode.js', 'src/main.js']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat');

};