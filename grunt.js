module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/!(lib)/*.js']
    },
    concat: {
      'server/public/qmote-client.js': ['client/src/lib/**/*.js', 'client/src/main.js']
    }
  });

  // Default task.
  grunt.registerTask('build-client', 'lint concat');
  grunt.registerTask('default', 'lint concat');

};