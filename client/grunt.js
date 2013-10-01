module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/!(lib)/*.js']
    },
    concat: {
      dist: {
        dest: 'dist/qrmote.js',
        src: ['before.txt', 'src/lib/**/*.js', 'src/utils/**/*.js', 'src/init.js', 'src/sockets.js', 'src/endpoint.js', 'src/client.js', 'src/server.js', 'after.txt']
      }
    }
  });

  // Default task.
  grunt.registerTask('build', 'lint concat:dist');
  grunt.registerTask('default', 'build');

};
