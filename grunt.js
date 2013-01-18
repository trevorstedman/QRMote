module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/!(lib)/*.js']
    },
    concat: {
      dist: {
        dest: 'client/dist/qrmote.js',
        src: ['before.txt', 'client/src/lib/**/*.js', 'client/src/utils/**/*.js', 'client/src/init.js', 'client/src/sockets.js', 'client/src/endpoint.js', 'client/src/client.js', 'client/src/server.js', 'after.txt']
      }
    }
  });

  // Default task.
  grunt.registerTask('build', 'lint concat:dist');
  grunt.registerTask('default', 'lint build');

};